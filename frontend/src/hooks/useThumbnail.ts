import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

export const useThumbnail = (videoId: number): string | undefined => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();

  const { data } = useQuery({
    queryKey: ["thumbnail", videoId],
    queryFn: async () => {
      const response = await apiClient.videosThumbnail(videoId, {
        responseType: "blob",
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      const url = URL.createObjectURL(data);
      setThumbnailUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [data]);

  return thumbnailUrl;
};
