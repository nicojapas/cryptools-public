import { useState, useEffect, useCallback } from "react";

import { BscTokenData } from "../utils/types";
import { mockBscTokensData } from "../mocks/bscTokensData";

declare global {
  interface ImportMetaEnv {
    VITE_USE_MOCKS?: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

// Public BSC RPC endpoints
const BSC_RPC_URLS = [
  "https://bsc-dataseed.binance.org/",
  "https://bsc-dataseed1.binance.org/",
  "https://bsc-dataseed2.binance.org/",
];

// Configuration
const BLOCKS_INITIAL_SCAN = 2000; // ~1.5 hours of history
const BLOCKS_POLLING_SCAN = 50;
const BATCH_SIZE = 5; // Process 5 blocks in parallel
const MIN_TOKENS_TO_STOP = 8; // Stop initial scan after finding this many
const CACHE_KEY = "bsc_tokens_cache";
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// ERC20 function selectors
const NAME_SELECTOR = "0x06fdde03";
const SYMBOL_SELECTOR = "0x95d89b41";

interface CachedData {
  tokens: BscTokenData[];
  timestamp: number;
  lastBlockScanned: number;
}

interface ScanProgress {
  currentBlock: number;
  totalBlocks: number;
  tokensFound: number;
}

export function getTimeDifferenceString(timeDifferenceSeconds: number): string {
  const seconds = Math.floor(timeDifferenceSeconds);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${Math.max(0, seconds)}s ago`;
}

function getCachedTokens(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedData = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_MAX_AGE_MS && data.tokens.length > 0) {
        return data;
      }
      localStorage.removeItem(CACHE_KEY);
    }
  } catch {
    localStorage.removeItem(CACHE_KEY);
  }
  return null;
}

function setCachedTokens(tokens: BscTokenData[], lastBlockScanned: number): void {
  if (tokens.length === 0) return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      tokens,
      timestamp: Date.now(),
      lastBlockScanned,
    }));
  } catch {
    // localStorage unavailable
  }
}

function decodeString(hex: string): string | null {
  if (!hex || hex === "0x" || hex.length < 130) return null;
  try {
    const offset = parseInt(hex.slice(2, 66), 16) * 2 + 2;
    const length = parseInt(hex.slice(offset, offset + 64), 16);
    if (length === 0 || length > 100) return null;
    const strHex = hex.slice(offset + 64, offset + 64 + length * 2);
    let str = "";
    for (let i = 0; i < strHex.length; i += 2) {
      const charCode = parseInt(strHex.slice(i, i + 2), 16);
      if (charCode > 0) str += String.fromCharCode(charCode);
    }
    return str.trim() || null;
  } catch {
    return null;
  }
}

async function rpcCall(rpcUrl: string, method: string, params: unknown[]): Promise<unknown> {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

interface RpcTransaction {
  hash: string;
  from: string;
  to: string | null;
}

interface RpcBlock {
  number: string;
  timestamp: string;
  transactions: RpcTransaction[];
}

interface RpcReceipt {
  contractAddress: string | null;
}

async function getTokenInfo(
  rpcUrl: string,
  contractAddress: string
): Promise<{ name: string; symbol: string } | null> {
  try {
    const [nameResult, symbolResult] = await Promise.all([
      rpcCall(rpcUrl, "eth_call", [{ to: contractAddress, data: NAME_SELECTOR }, "latest"]),
      rpcCall(rpcUrl, "eth_call", [{ to: contractAddress, data: SYMBOL_SELECTOR }, "latest"]),
    ]);
    const name = decodeString(nameResult as string);
    const symbol = decodeString(symbolResult as string);
    if (name && symbol) return { name, symbol };
  } catch {
    // Not an ERC20
  }
  return null;
}

// Process a single block for contract creations
async function processBlock(
  rpcUrl: string,
  blockNum: number
): Promise<BscTokenData[]> {
  const tokens: BscTokenData[] = [];
  const blockHex = "0x" + blockNum.toString(16);

  try {
    const block = await rpcCall(rpcUrl, "eth_getBlockByNumber", [blockHex, true]) as RpcBlock | null;
    if (!block?.transactions) return tokens;

    const blockTimestamp = parseInt(block.timestamp, 16);
    const contractCreations = block.transactions.filter(tx => tx.to === null);

    for (const tx of contractCreations) {
      try {
        const receipt = await rpcCall(rpcUrl, "eth_getTransactionReceipt", [tx.hash]) as RpcReceipt | null;
        if (!receipt?.contractAddress) continue;

        const tokenInfo = await getTokenInfo(rpcUrl, receipt.contractAddress);
        if (tokenInfo) {
          tokens.push({
            blockTimestamp,
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            contract_address: receipt.contractAddress,
            creator: tx.from,
            block_number: String(blockNum),
          });
        }
      } catch {
        // Skip failed receipts
      }
    }
  } catch {
    // Skip failed blocks
  }

  return tokens;
}

// Scan blocks in parallel batches
async function scanBlocksParallel(
  rpcUrl: string,
  blocksToScan: number,
  onTokenFound: (token: BscTokenData) => void,
  onProgress: (progress: ScanProgress) => void,
  signal?: AbortSignal,
  stopAfterTokens?: number
): Promise<{ latestBlock: number; tokensFound: number }> {
  let tokensFound = 0;

  const latestBlockHex = await rpcCall(rpcUrl, "eth_blockNumber", []) as string;
  const latestBlock = parseInt(latestBlockHex, 16);

  console.log(`[BSC Sniffer] Scanning blocks from ${latestBlock} in batches of ${BATCH_SIZE}`);

  // Process blocks in batches
  for (let i = 0; i < blocksToScan; i += BATCH_SIZE) {
    if (signal?.aborted) break;

    // Stop early if we've found enough tokens
    if (stopAfterTokens && tokensFound >= stopAfterTokens) {
      console.log(`[BSC Sniffer] Found ${tokensFound} tokens, stopping early`);
      break;
    }

    // Create batch of block numbers
    const batchBlocks: number[] = [];
    for (let j = 0; j < BATCH_SIZE && i + j < blocksToScan; j++) {
      batchBlocks.push(latestBlock - (i + j));
    }

    // Process batch in parallel
    const batchResults = await Promise.all(
      batchBlocks.map(blockNum => processBlock(rpcUrl, blockNum))
    );

    // Add found tokens
    for (const blockTokens of batchResults) {
      for (const token of blockTokens) {
        console.log(`[BSC Sniffer] Found: ${token.name} (${token.symbol})`);
        onTokenFound(token);
        tokensFound++;
      }
    }

    // Update progress
    onProgress({
      currentBlock: Math.min(i + BATCH_SIZE, blocksToScan),
      totalBlocks: blocksToScan,
      tokensFound,
    });
  }

  return { latestBlock, tokensFound };
}

export const useBscTokensData = () => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

  const [tokens, setTokens] = useState<BscTokenData[]>(() => {
    const cached = getCachedTokens();
    return cached?.tokens || [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [isInitialScan, setIsInitialScan] = useState(true);

  const addToken = useCallback((newToken: BscTokenData) => {
    setTokens(prev => {
      if (prev.some(t => t.contract_address.toLowerCase() === newToken.contract_address.toLowerCase())) {
        return prev;
      }
      const updated = [newToken, ...prev]
        .sort((a, b) => Number(b.block_number) - Number(a.block_number))
        .slice(0, 100);
      return updated;
    });
  }, []);

  const runScan = useCallback(async (signal: AbortSignal) => {
    if (useMocks) {
      const normalized = mockBscTokensData.data.map((token) => ({
        ...token,
        blockTimestamp: Number(token.timestamp),
        block_number: String(token.block_number),
      }));
      setTokens(normalized);
      setIsLoading(false);
      return;
    }

    const blocksToScan = isInitialScan ? BLOCKS_INITIAL_SCAN : BLOCKS_POLLING_SCAN;
    console.log("[BSC Sniffer] Starting scan, isInitial:", isInitialScan, "blocks:", blocksToScan);

    setIsLoading(true);
    setError(null);

    for (const rpcUrl of BSC_RPC_URLS) {
      if (signal.aborted) return;

      try {
        const { latestBlock, tokensFound } = await scanBlocksParallel(
          rpcUrl,
          blocksToScan,
          addToken,
          setProgress,
          signal,
          isInitialScan ? MIN_TOKENS_TO_STOP : undefined
        );

        console.log("[BSC Sniffer] Scan complete. Found", tokensFound, "tokens");

        setTokens(current => {
          if (current.length > 0) {
            setCachedTokens(current, latestBlock);
          }
          return current;
        });

        setIsLoading(false);
        setIsInitialScan(false);
        setProgress(null);
        return;
      } catch (err) {
        console.warn("[BSC Sniffer] RPC failed:", rpcUrl, err);
      }
    }

    setError(new Error("All BSC RPC endpoints failed"));
    setIsLoading(false);
  }, [useMocks, isInitialScan, addToken]);

  // Initial scan
  useEffect(() => {
    const controller = new AbortController();
    runScan(controller.signal);
    return () => controller.abort();
  }, []);

  // Polling
  useEffect(() => {
    if (isInitialScan) return;

    const interval = setInterval(() => {
      const controller = new AbortController();
      runScan(controller.signal);
    }, 60000);

    return () => clearInterval(interval);
  }, [isInitialScan, runScan]);

  return {
    data: tokens,
    isLoading: isLoading && tokens.length === 0,
    error,
    progress,
    isScanning: isLoading,
  };
};
