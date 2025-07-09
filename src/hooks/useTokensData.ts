import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants";
import { BiggestCoinData } from "../utils/types";

export const useTokensData = () => {
  return useQuery<BiggestCoinData[]>({
    queryKey: ["cryptoolsTokensData"],
    queryFn: () => fetch(new URL("tokens", API_URL).toString()).then((res) => res.json()),
    retry: false,
  });
}; 