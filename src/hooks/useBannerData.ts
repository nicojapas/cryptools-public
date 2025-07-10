import { useQuery } from "@tanstack/react-query";
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

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

export const useBannerData = () => {
  return useQuery<Coin[], Error>({
    queryKey: ["bannerData"],
    queryFn: async () => {
      if (useMocks) {
        // Return mock data for testing
        return Promise.resolve(mockBannerData);
      }
      const API_URL = await getApiUrl();
      const url = new URL("banner", API_URL).toString();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      return json.data as Coin[];
    },
  });
}; 