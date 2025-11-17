import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export const useRecordingStatus = () => {
  return useQuery({
    queryKey: ["recording-status"],
    queryFn: async () => {
      const response = await apiClient.statusGet();
      return response.data;
    },
    refetchInterval: 5000, // 5秒ごとにポーリング
  });
};
