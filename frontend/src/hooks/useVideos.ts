import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export const useVideos = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ["videos", limit, offset],
    queryFn: async () => {
      const response = await apiClient.videosList(limit, offset);
      return response.data;
    },
  });
};
