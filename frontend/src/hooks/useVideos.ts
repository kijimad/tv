import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export const useVideos = (
  page = 1,
  size = 100,
  startedAtFrom?: Date,
  startedAtTo?: Date,
) => {
  return useQuery({
    queryKey: [
      "videos",
      page,
      size,
      startedAtFrom?.toISOString(),
      startedAtTo?.toISOString(),
    ],
    queryFn: async () => {
      const response = await apiClient.videosList(
        page,
        size,
        startedAtFrom?.toISOString(),
        startedAtTo?.toISOString(),
      );
      return response.data;
    },
  });
};
