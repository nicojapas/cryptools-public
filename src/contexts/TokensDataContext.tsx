import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getApiUrl } from "../constants";
import { BiggestCoinData, Coin } from "../utils/types";
import { mockTokensData } from "../mocks/tokensData";

declare global {
  interface ImportMetaEnv {
    VITE_USE_MOCKS?: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

interface TokensDataContextType {
  biggestCoinsData: BiggestCoinData[] | undefined;
  topGainersData: Coin[] | undefined;
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
      return mockTokensData;
    }
    return null;
  }, [useMocks]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokensData"],
    queryFn: async () => {
      if (useMocks) {
        return mockData!;
      }
      
      const API_URL = await getApiUrl();
      const response = await fetch(new URL("tokens", API_URL).toString());
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const json = await response.json();
      
      return json.data;
    },
    retry: false,
  });

  const contextValue: TokensDataContextType = {
    biggestCoinsData: data?.biggestCoins,
    topGainersData: data?.topGainers,
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