import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getApiUrl } from "../constants";
import { Coin } from "../utils/types";
import { mockBannerData } from "../mocks/bannerData";

declare global {
  interface ImportMetaEnv {
    VITE_USE_MOCKS?: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

// Identity transformation for now
const transformBannerData = (data: Coin[]): Coin[] => data;

export const useBannerData = () => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  const mockData = useMemo(() => {
    if (useMocks) {
      return transformBannerData(mockBannerData);
    }
    return null;
  }, [useMocks]);

  return useQuery<Coin[], Error>({
    queryKey: ["bannerData"],
    queryFn: async () => {
      if (useMocks) {
        return mockData!;
      }
      const API_URL = await getApiUrl();
      const url = new URL("banner", API_URL).toString();
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
      } else {
        throw new Error('Invalid API response structure');
      }
      return transformBannerData(results as Coin[]);
    },
    retry: false,
  });
}; 