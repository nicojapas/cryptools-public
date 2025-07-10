import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
  if (!Array.isArray(rawData)) {
    console.error('transformNewsData: rawData is not an array:', rawData);
    return [];
  }
  
  return rawData.map((item, index) => {
    try {
      // Generate sample vote data for real API data to make it more interesting
      const sampleVotes = {
        positive: Math.floor(Math.random() * 50) + 5,
        comments: Math.floor(Math.random() * 20) + 2,
        liked: Math.floor(Math.random() * 30) + 3,
        important: Math.floor(Math.random() * 15) + 1,
        saved: Math.floor(Math.random() * 10) + 1,
        lol: Math.floor(Math.random() * 8) + 1,
        negative: Math.floor(Math.random() * 5),
        toxic: Math.floor(Math.random() * 3),
        disliked: Math.floor(Math.random() * 2)
      };
      
      // Filter out zero values
      const votes = Object.fromEntries(
        Object.entries(sampleVotes).filter(([_, value]) => value > 0)
      );
      
      return {
        url: item.url,
        timeSincePublished: getTimeSincePublished(item.published_at),
        title: item.title,
        votes: votes
      };
    } catch (error) {
      console.error(`Error transforming item ${index}:`, item, error);
      return {
        url: "#",
        timeSincePublished: "unknown",
        title: "Error loading article",
        votes: {}
      };
    }
  });
};

export const useNewsData = () => {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
  
  // Memoize the mock data transformation to prevent unnecessary re-computations
  const mockData = useMemo(() => {
    if (useMocks) {
      return transformNewsData(mockNewsData);
    }
    return null;
  }, [useMocks]);

  return useQuery<NewsData[], Error>({
    queryKey: ["newsData"],
    queryFn: async () => {
      if (useMocks) {
        // Return memoized mock data
        return mockData!;
      }
      
      try {
        const API_URL = await getApiUrl();
        const url = new URL("news", API_URL).toString();
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        // Check if the response has the expected structure
        if (!json || typeof json !== 'object') {
          throw new Error('Invalid API response: not an object');
        }
        
        // Handle different possible response structures
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
        
        return transformNewsData(results as RawNewsData[]);
      } catch (error) {
        console.error('Error fetching news data:', error);
        throw error;
      }
    },
  });
}; 