import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../constants";
import { NewsData, RawNewsData } from "../utils/types";
import { mockNewsData } from "../mocks/newsData";

declare global {
  interface ImportMetaEnv {
    VITE_USE_MOCKS?: string;
  }
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// Helper function to calculate time since published
const getTimeSincePublished = (publishedAt: string): string => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "less than 1 hour ago";
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 day ago";
  return `${diffInDays} days ago`;
};

// Transform raw API data to component format
const transformNewsData = (rawData: RawNewsData[]): NewsData[] => {
  return rawData.map(item => ({
    url: item.url || "#", // Use "#" as fallback if url is null
    timeSincePublished: getTimeSincePublished(item.published_at),
    title: item.title,
    votes: item.votes
  }));
};

export const useNewsData = () => {
  return useQuery<NewsData[], Error>({
    queryKey: ["newsData"],
    queryFn: async () => {
      if (useMocks) {
        // Transform mock data to the expected format
        return Promise.resolve(transformNewsData(mockNewsData));
      }
      const API_URL = await getApiUrl();
      const url = new URL("news", API_URL).toString();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      // Transform the raw API response
      return transformNewsData(json.results as RawNewsData[]);
    },
  });
}; 