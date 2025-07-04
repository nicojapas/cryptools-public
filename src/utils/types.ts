export interface Coin {
  image: string;
  name: string;
  symbol: string;
  price: string | number;
  priceChangePercentage24H?: number | null; // optional for flexibility
  price_change_percentage_24h?: number; // for API variants
  id?: string | null; // for cases like Gainer
}

export type Coins = Coin[];

export interface InfoCardProps {
  title?: string;
  value: string;
  tokenStatus?: boolean;
  md?: number;
  xs?: number;
}

export interface InfoLabelProps {
  name: string;
  value: string;
  fullWidth?: boolean;
}

export interface LoserCardProps extends Coin {
  index: number;
}

export interface TsxPanelProps {
  currentAccount: string;
  web3: Web3Instance;
  chainId: number;
  buyAmount: number;
  targetAddress: string;
}

export interface TargetPanelProps {
  currentAccount: string;
  targetAddressInput: string;
  targetAddress: string;
  targetData: Record<string, string>;
  setTargetAddress: (address: string) => void;
  handlePasteButtonClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonToExternalSiteProps {
  targetAddress: string;
  baseUrl: string;
  icon: string;
}

export interface ChartComponentProps {
  data: unknown[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

export interface SniperSettingsPanelProps {
  selectedDexVer: string;
  handleSelectedDexVer: (event: React.MouseEvent<HTMLElement>, newValue: string) => void;
  selectedDexAddress: string;
  balance: string | number;
  buyAmount: string | number;
  setBuyAmount: (value: number) => void;
}

export interface WalletPanelProps {
  connect: () => void;
  currentAccount: string | null | undefined;
  chainId: number | undefined;
  balance: string | undefined;
}

export interface ConnectButtonProps {
  connect: () => void;
  currentAccount: string | null;
}

export interface ExtendedWalletPanelProps extends WalletPanelProps {
  buyTxsApproved?: string | number;
}

export interface TargetData {
  name: string;
  symbol: string;
  balanceOf: string;
  decimals: string;
  totalSupply: string;
}

export interface TestResults {
  tokenStatus: boolean;
  safuness?: string;
  msg?: string;
  name?: string;
  symbol?: string;
  buyTax?: string | number;
  sellTax?: string | number;
}

export interface TargetAddressComponentProps {
  targetAddressInput: string;
  tokenStatus: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Web3BN {
  toString(base?: number): string;
  mul(other: Web3BN): Web3BN;
  sub(other: Web3BN): Web3BN;
  div(other: Web3BN): Web3BN;
}

export interface Web3Instance {
  eth: {
    getBalance: (address: string) => Promise<string>;
    Contract: new (abi: unknown, address: string) => Web3Contract;
  };
  utils: {
    fromWei: (value: string, unit?: string) => string;
    toWei: (value: string, unit?: string) => string;
    toBN: (value: string | number) => Web3BN;
    isAddress: (address: string) => boolean;
  };
  currentProvider?: unknown;
}

export interface Web3Contract {
  methods: {
    name: () => { call: () => Promise<string> };
    symbol: () => { call: () => Promise<string> };
    balanceOf: (address: string) => { call: () => Promise<string> };
    decimals: () => { call: () => Promise<string> };
    totalSupply: () => { call: () => Promise<string> };
    getAmountsOut: (amountIn: string, path: string[]) => { call: () => Promise<string[]> };
    swapExactETHForTokens: (...args: string[]) => {
      estimateGas: (options: { from: string; value: string }) => Promise<number>;
      send: (options: { from: string; value: string; gas: number }) => Promise<unknown>;
    };
  };
}

export interface EthereumProvider {
  request: (request: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, handler: (data: unknown) => void) => void;
}

export interface EthereumRequestMethods {
  "eth_chainId": () => Promise<string>;
  "eth_accounts": () => Promise<string[]>;
  "eth_requestAccounts": () => Promise<string[]>;
}

export interface NFTData {
  totalPrice: number;
  imgPreviewUrl: string;
  name: string;
  tokenId: string;
  description: string;
  price: string;
  currency: string;
  imgBigUrl: string;
  paymentTokenSymbol: string;
  paymentTokenDecimals: number;
  paymentTokenImg: string;
  paymentTokenEthPrice: number;
  paymentTokenUsdPrice: number;
}

export interface CustomCardProps {
  totalPrice: number;
  imgPreviewUrl: string;
  name: string;
  tokenId: string;
  description: string;
  price: string;
  currency: string;
  imgBigUrl: string;
  paymentTokenSymbol: string;
  paymentTokenDecimals: number;
  paymentTokenImg: string;
  paymentTokenEthPrice: number;
  paymentTokenUsdPrice: number;
  cardHeight: string;
}

export interface NewsVotes {
  toxic?: number;
  positive?: number;
  negative?: number;
  important?: number;
  comments?: number;
  liked?: number;
  disliked?: number;
  saved?: number;
  lol?: number;
}

export interface NewsData {
  url: string;
  timeSincePublished: string;
  title: string;
  votes: NewsVotes;
}

export interface VotesComponentProps {
  color: string;
  n: number;
  icon: React.FC;
}

export interface VoteMapItem {
  color: string;
  icon: React.FC;
}

export interface VoteMap {
  toxic: VoteMapItem;
  positive: VoteMapItem;
  negative: VoteMapItem;
  important: VoteMapItem;
  comments: VoteMapItem;
  liked: VoteMapItem;
  disliked: VoteMapItem;
  saved: VoteMapItem;
  lol: VoteMapItem;
}

export interface TrendingCoinItem {
  id: string | null;
  name: string;
  symbol: string;
  score: number;
  large: string;
}

export interface TrendingCoinData {
  coins: Array<{ item: TrendingCoinItem }>;
}

export interface TrendingCoinCardProps {
  id: string | null;
  name: string;
  symbol: string;
  score: number;
  large: string;
}

export interface HomeAction {
  icon: React.FC;
  page: string;
}

export interface BadgeInfo {
  text: string;
  color: string;
}

export interface BadgesMap {
  "rug-checker": BadgeInfo;
  "bsc-sniffer": BadgeInfo;
  sniper: BadgeInfo;
  nfts: BadgeInfo;
}

export interface HomeProps {
  setSettingsButton?: () => void;
  coinsData?: Coin[];
}

export interface PagesIconButtonProps {
  action: HomeAction;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  badge?: BadgeInfo;
}

export interface BscTokenData {
  timestamp: string;
  name: string;
  symbol: string;
  contract_address: string;
  creator: string;
  [key: string]: string;
}

export interface TokenTableRowProps {
  token: BscTokenData;
  id: number;
  hovered: number | undefined;
  setHovered: (id: number | undefined) => void;
}

export interface BiggestCoinData {
  image: string;
  name: string;
  symbol: string;
  marketCapRank: number;
  marketCap: string;
  marketCapChange24H: string;
  marketCapChangePercentage24H: string;
  currentPrice: string;
  priceChange24H: string;
  circulatingSupply: string;
  sparkline7D?: number[];
  stable?: boolean;
  wrapped?: boolean;
}

export interface SettingsState {
  stable: boolean;
  wrapped: boolean;
}

export interface BiggestCoinsProps {
  setSettingsButton: (button?: React.ReactElement) => void;
}

export interface CoinCardProps {
  coin: BiggestCoinData;
}

export interface SettingsProps {
  settingsState: SettingsState;
  setSettingsState: (state: SettingsState) => void;
  setSettingsButton: (button?: React.ReactElement) => void;
}

export interface TradePanelProps {
  selectedDexVer: string;
  handleSelectedDexVer: (event: React.MouseEvent<HTMLElement>, newValue: string) => void;
  selectedDexAddress: string;
}

export interface DexVersion {
  auto: string;
  v1: string;
  v2: string;
}

export interface CryptoolsAppBarProps {
  themeModeButton: React.ReactElement;
  settingsButton: React.ReactElement;
}

export interface DashboardMarketOverviewData {
  image: string;
  name: string;
  symbol: string;
  currentPrice: string | number;
  priceChange24H: number;
  priceChangePercentage24H: number;
}

export interface DashboardCoinCardProps {
  data: DashboardMarketOverviewData;
}

export interface DashboardCryptoPanicData {
  url: string;
  timeSincePublished: string;
  title: string;
  votes: NewsVotes;
}

export interface ExternalSiteButtonProps {
  targetAddress: string;
  baseUrl: string;
  icon: string;
}

export interface PoocoinItemProps {
  targetAddress: string;
}

export interface BscScanItemProps {
  targetAddress: string;
}

export interface BuyFunctionParams {
  msg: Record<string, string>;
  inputAmount: string;
  walletAddress: string;
  targetTokenAddress: string;
  router: string;
  inTokenAddress: string;
  gas?: number;
  gasPrice?: string | number;
  waitingTime?: number;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

declare global {
  var Web3: {
    new (provider: unknown): Web3Instance;
    givenProvider: unknown;
  };
} 