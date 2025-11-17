import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useVideos } from "../hooks/useVideos";
import VideoPlayerModal from "../components/video/VideoPlayerModal";
import type { Video } from "../oapi";

export default function Timeline() {
  const { data, isLoading, error } = useVideos();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // 今日の動画のみフィルタする
  const getTodayVideos = () => {
    if (!data?.videos) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return data.videos.filter((video) => {
      const videoDate = new Date(video.startedAt);
      return videoDate >= today && videoDate < tomorrow;
    });
  };

  const todayVideos = getTodayVideos();

  // その日の最初のタスクの開始時刻を取得する
  const getFirstTaskStartHour = () => {
    if (todayVideos.length === 0) return 0;
    const firstVideo = todayVideos.reduce((earliest, video) => {
      const videoDate = new Date(video.startedAt);
      const earliestDate = new Date(earliest.startedAt);
      return videoDate < earliestDate ? video : earliest;
    });
    return new Date(firstVideo.startedAt).getHours();
  };

  const firstHour = getFirstTaskStartHour();
  // 最初のタスクの時刻から23時までの時刻配列を生成する
  const hours = Array.from({ length: 24 - firstHour }, (_, i) => i + firstHour);

  // 最初のタスク開始時刻からの経過分数を計算する
  const getMinutesFromStart = (dateString: string) => {
    const date = new Date(dateString);
    const totalMinutes = date.getHours() * 60 + date.getMinutes();
    const startMinutes = firstHour * 60;
    return totalMinutes - startMinutes;
  };

  // 動画の長さ（分）を計算する
  const getDurationMinutes = (startedAt: string, finishedAt: string) => {
    const start = new Date(startedAt);
    const end = new Date(finishedAt);
    return Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
  };

  if (isLoading) {
    return <Box>読み込み中...</Box>;
  }

  if (error) {
    return <Box>エラーが発生しました</Box>;
  }

  // タイムラインの高さを計算する（最初の時刻から23:59まで）
  const timelineHeight = (24 - firstHour) * 60;

  // 現在時刻の位置を計算する
  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = firstHour * 60;
    return currentMinutes - startMinutes;
  };

  const currentTimePosition = getCurrentTimePosition();

  return (
    <Box>
      <Heading size="lg" mb={6}>
        タイムライン（今日）
      </Heading>
      <Box position="relative" h={`${timelineHeight}px`} w="full">
        {/* 時刻軸 */}
        {hours.map((hour, index) => (
          <Box
            key={hour}
            position="absolute"
            top={`${index * 60}px`}
            w="full"
            borderTop="1px solid"
            borderColor="gray.200"
          >
            <Box
              position="absolute"
              left="0"
              top="-10px"
              fontSize="sm"
              w="60px"
              textAlign="right"
              pr={2}
            >
              {hour.toString().padStart(2, "0")}:00
            </Box>
          </Box>
        ))}

        {/* 現在時刻線 */}
        {currentTimePosition >= 0 && currentTimePosition <= timelineHeight && (
          <Box
            position="absolute"
            top={`${currentTimePosition}px`}
            left="0"
            w="full"
            borderTop="2px solid red"
            zIndex={10}
          />
        )}

        {/* 動画カード */}
        {todayVideos.map((video) => {
          const startMinutes = getMinutesFromStart(video.startedAt);
          const durationMinutes = getDurationMinutes(
            video.startedAt,
            video.finishedAt,
          );
          const height = Math.max(durationMinutes, 20); // 最小20pxの高さ

          return (
            <Box
              key={video.id}
              position="absolute"
              top={`${startMinutes}px`}
              left="80px"
              w="calc(100% - 100px)"
              h={`${height}px`}
              bg="gray.100"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              p={2}
              cursor="pointer"
              onClick={() => setSelectedVideo(video)}
              overflow="hidden"
            >
              <Box
                fontSize="sm"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {video.title || video.filename}
              </Box>
              <Box fontSize="xs">{durationMinutes}分</Box>
            </Box>
          );
        })}
      </Box>

      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </Box>
  );
}
