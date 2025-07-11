import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getApiUrl } from "../constants";
import { TrendingCoinItem } from "../utils/types";
import { mockTrendingCoinsData } from "../mocks/trendingCoinsData";

declare global {
  interface ImportMetaEnv {
    VITE_USE_MOCKS?: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

// Identity transformation for now
const transformTrendingCoinsData = (data: TrendingCoinItem[]): TrendingCoinItem[] => data;

export const useTrendingCoinsData = () => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  const mockData = useMemo(() => {
    if (useMocks) {
      return transformTrendingCoinsData(mockTrendingCoinsData);
    }
    return null;
  }, [useMocks]);

  return useQuery<TrendingCoinItem[], Error>({
    queryKey: ["cryptoolsTrendingData"],
    queryFn: async () => {
      if (useMocks) {
        return mockData!;
      }
      const API_URL = await getApiUrl();
      const url = new URL("trending", API_URL).toString();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      let results;
      if (Array.isArray(json)) {
        results = json;
      } else if (json.results && Array.isArray(json.results)) {
        results = json.results;
      } else if (json.data && Array.isArray(json.data)) {
        results = json.data;
      } else if (json.coins && Array.isArray(json.coins)) {
        results = json.coins.map((obj: { item: TrendingCoinItem }) => obj.item);
      } else {
        throw new Error('Invalid API response structure');
      }
      return transformTrendingCoinsData(results as TrendingCoinItem[]);
    },
    retry: false,
  });
}; 