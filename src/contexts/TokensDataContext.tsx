import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getApiConfig } from "../constants";
import { BiggestCoinData, Coin, TrendingCoinItem, MarketSentiment } from "../utils/types";
import { mockTokensData } from "../mocks/tokensData";
import { mockBannerData } from "../mocks/bannerData";
import { mockTrendingCoinsData } from "../mocks/trendingCoinsData";

declare global {
  interface ImportMetaEnv {
    VITE_USE_MOCKS?: string;
    VITE_AWS_INVOKE_URL: string;
    VITE_AWS_API_KEY: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}



interface TokensDataContextType {
  biggestCoinsData: BiggestCoinData[] | undefined;
  topGainersData: Coin[] | undefined;
  worstLosersData: Coin[] | undefined;
  trendingCoinsData: TrendingCoinItem[] | undefined;
  bannerData: Coin[] | undefined;
  marketSentiment: MarketSentiment | undefined;
  isLoading: boolean;
  error: Error | null;
}

const TokensDataContext = createContext<TokensDataContextType | undefined>(undefined);

interface TokensDataProviderProps {
  children: ReactNode;
}

export const TokensDataProvider = ({ children }: TokensDataProviderProps) => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  const mockData = useMemo(() => {
    if (useMocks) {
      return {
        ...mockTokensData,
        banner: mockBannerData,
        trendingCoins: mockTrendingCoinsData
      };
    }
    return null;
  }, [useMocks]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokensData"],
    queryFn: async () => {
      if (useMocks) {
        return mockData!;
      }
      
      try {
        const { url: API_URL, apiKey } = getApiConfig();
        const requestUrl = new URL("tokens", API_URL).toString();
        
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
        
        return json.data;
      } catch (error) {
        console.error('Error fetching tokens data:', error);
        throw error;
      }
    },
    retry: false,
  });

  const contextValue: TokensDataContextType = {
    biggestCoinsData: data?.biggestCoins,
    topGainersData: data?.topGainers,
    worstLosersData: data?.worstLosers,
    trendingCoinsData: data?.trendingCoins,
    bannerData: data?.banner,
    marketSentiment: data?.sentiment,
    isLoading,
    error: error as Error | null,
  };

  return (
    <TokensDataContext.Provider value={contextValue}>
      {children}
    </TokensDataContext.Provider>
  );
};

export const useTokensDataContext = () => {
  const context = useContext(TokensDataContext);
  if (context === undefined) {
    throw new Error('useTokensDataContext must be used within a TokensDataProvider');
  }
  return context;
}; 