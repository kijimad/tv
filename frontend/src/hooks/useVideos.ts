import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export const useVideos = (page = 1, size = 100) => {
  return useQuery({
    queryKey: ["videos", page, size],
    queryFn: async () => {
      const response = await apiClient.videosList(page, size);
      return response.data;
    },
  });
};
