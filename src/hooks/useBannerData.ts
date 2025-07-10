import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../constants";
import { Coin } from "../utils/types";

export const useBannerData = () => {
  return useQuery<Coin[], Error>({
    queryKey: ["bannerData"],
    queryFn: async () => {
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