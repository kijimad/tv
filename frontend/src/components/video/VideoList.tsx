import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import { useVideos } from "../../hooks/useVideos";
import VideoCard from "./VideoCard";
import { useState } from "react";
import VideoPlayerModal from "./VideoPlayerModal";
import type { Video } from "../../oapi";

export default function VideoList() {
  const { data, isLoading, error } = useVideos();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="red.500">動画の読み込みに失敗しました</Text>
      </Box>
    );
  }

  if (!data?.videos || data.videos.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">録画データがありません</Text>
      </Box>
    );
  }

  return (
    <>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        w="full"
      >
        {data.videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </Grid>

      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
