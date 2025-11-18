import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

export const useVideoFile = (videoId: number) => {
  const [videoUrl, setVideoUrl] = useState<string>();

  const { data } = useQuery({
    queryKey: ["videoFile", videoId],
    queryFn: async () => {
      const response = await apiClient.videosFile(videoId, {
        responseType: "blob",
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (!data) return;

    const url = URL.createObjectURL(data);
    setVideoUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [data]);

  return videoUrl;
};
