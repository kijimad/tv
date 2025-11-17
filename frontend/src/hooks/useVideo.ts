import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export const useVideo = (id: number) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      const response = await apiClient.videosGet(id);
      return response.data;
    },
  });
};
