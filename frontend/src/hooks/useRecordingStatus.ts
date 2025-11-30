import { useQuery } from "@tanstack/react-query";

// RecordingInfoの型定義
type RecordingStatus =
  | "idle"
  | "recording"
  | "processing"
  | "success"
  | "failed";

interface RecordingInfo {
  status: RecordingStatus;
  filename: string;
  title?: string;
}

export const useRecordingStatus = () => {
  return useQuery({
    queryKey: ["recording-status"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8091/status");
      if (!response.ok) {
        throw new Error("Failed to fetch recording status");
      }
      const data: RecordingInfo[] = await response.json();
      return data;
    },
    refetchInterval: 5000, // 5秒ごとにポーリング
  });
};
