import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants";
import { BiggestCoinData } from "../utils/types";
import { mockTokensData } from "../mocks/tokensData";

export const useTokensData = () => {
  const shouldUseMockData = false;
  
  return useQuery<BiggestCoinData[]>({
    queryKey: ["cryptoolsTokensData"],
    queryFn: () => {
      if (shouldUseMockData) {
        // Return mock data for testing
        return Promise.resolve(mockTokensData);
      }
      // Return real API data
      return fetch(new URL("tokens", API_URL).toString()).then((res) => res.json());
    },
    retry: false,
  });
}; 