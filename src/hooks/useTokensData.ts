import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../constants";
import { BiggestCoinData } from "../utils/types";
import { mockTokensData } from "../mocks/tokensData";

export const useTokensData = () => {
  const shouldUseMockData = false;
  
  return useQuery<BiggestCoinData[]>({
    queryKey: ["cryptoolsTokensData"],
    queryFn: async () => {
      if (shouldUseMockData) {
        // Return mock data for testing
        return Promise.resolve(mockTokensData);
      }
      // Fetch API URL dynamically
      const API_URL = await getApiUrl();
      const url = new URL("tokens", API_URL).toString();
      const res = await fetch(url);
      const data = await res.json();
      return data.data;
    },
    retry: false,
  });
}; 