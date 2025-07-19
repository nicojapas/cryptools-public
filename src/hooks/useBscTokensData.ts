import { useQuery } from "@tanstack/react-query";

import { getApiConfig } from "../constants";
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

const transformBscTokensData = (data: BscTokenData[]): BscTokenData[] => {
  // Convert timestamps to relative time strings
  const now = new Date().getTime() / 1000;
  return data.map((token) => ({
    ...token,
    timestamp: getTimeDifferenceString(now - parseInt(token.timestamp))
  }));
};

function getTimeDifferenceString(timeDifference: number): string {
  const seconds = Math.floor(timeDifference);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
}

export const useBscTokensData = () => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  return useQuery<BscTokenData[], Error>({
    queryKey: ["cryptoolsNewBscTokensData"],
    queryFn: async () => {
      if (useMocks) {
        // Convert all fields to string for mock data
        const normalized = mockBscTokensData.data.map(token => ({
          ...token,
          timestamp: String(token.timestamp),
          block_number: String(token.block_number),
        }));
        return transformBscTokensData(normalized);
      }
      
      try {
        const { url: API_URL, apiKey } = getApiConfig();
        const url = new URL("fetch_bsc_tokens", API_URL);
        url.searchParams.set("blocks", "10");
        const requestUrl = url.toString();
        
        const headers = {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        };
        
        const response = await fetch(requestUrl, { headers });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        
        const json = await response.json();
        
        if (!json.data || !Array.isArray(json.data)) {
          throw new Error('Invalid API response: missing data array');
        }
        // Convert all fields to string for API data
        const normalized = json.data.map((token: any) => ({
          ...token,
          timestamp: String(token.timestamp),
          block_number: String(token.block_number),
        }));
        return transformBscTokensData(normalized);
      } catch (error) {
        console.error('Error fetching BSC tokens data:', error);
        throw error;
      }
    },
    refetchInterval: 10000,
    retry: false,
  });
}; 