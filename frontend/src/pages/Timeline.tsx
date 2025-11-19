import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useVideos } from "../hooks/useVideos";
import { useThumbnail } from "../hooks/useThumbnail";
import VideoPlayerModal from "../components/video/VideoPlayerModal";
import type { Video } from "../oapi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function VideoThumbnail({ videoId }: { videoId: number }) {
  const thumbnailUrl = useThumbnail(videoId);
  return (
    <Image
      src={thumbnailUrl}
      alt="サムネイル"
      objectFit="cover"
      w="60px"
      h="40px"
      borderRadius="sm"
      flexShrink={0}
    />
  );
}

export default function Timeline() {
  const { data, isLoading, error } = useVideos();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 選択された日付の動画のみフィルタする
  const getVideosForDate = (date: Date) => {
    if (!data?.data) return [];

    return data.data.filter((video: Video) => {
      const videoDate = new Date(video.startedAt);
      // 年月日のみを比較する
      return (
        videoDate.getFullYear() === date.getFullYear() &&
        videoDate.getMonth() === date.getMonth() &&
        videoDate.getDate() === date.getDate()
      );
    });
  };

  const displayVideos = getVideosForDate(selectedDate);

  // その日の最初の動画の開始時刻を取得する
  const getFirstVideoStartHour = () => {
    if (displayVideos.length === 0) return 0;
    const firstVideo = displayVideos.reduce((earliest: Video, video: Video) => {
      const videoTime = new Date(video.startedAt).getTime();
      const earliestTime = new Date(earliest.startedAt).getTime();
      return videoTime < earliestTime ? video : earliest;
    });
    return new Date(firstVideo.startedAt).getHours();
  };

  const firstHour = getFirstVideoStartHour();

  // 前の日に移動する
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // 今日に移動する
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // 次の日に移動する
  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // 選択された日付が今日かどうかを判定する
  const isToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    return today.getTime() === selected.getTime();
  };

  // 最初の動画開始時刻から23時までの時刻配列を生成する
  const hours = Array.from({ length: 24 - firstHour }, (_, i) => i + firstHour);

  // 0時からの経過分数を計算する
  const getMinutesFromStart = (dateString: string) => {
    const date = new Date(dateString);
    return date.getHours() * 60 + date.getMinutes();
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

  // タイムラインの高さを計算する（最初の動画開始時刻から23:59まで）
  const timelineHeight = (24 - firstHour) * 60;

  // 現在時刻の位置を計算する（最初の動画開始時刻からの相対位置）
  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = firstHour * 60;
    return currentMinutes - startMinutes;
  };

  const currentTimePosition = getCurrentTimePosition();

  // 選択された日付を表示する
  const formatSelectedDate = () => {
    return selectedDate.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container maxW="container.xl">
      <Heading size="xl" mb={4}>
        タイムライン
      </Heading>
      <HStack mb={6} gap={2}>
        <Button
          onClick={goToPreviousDay}
          size="sm"
          variant="outline"
          aria-label="前の日"
        >
          <IoChevronBack />
        </Button>
        <Button
          onClick={goToToday}
          size="sm"
          variant="outline"
          disabled={isToday()}
        >
          今日
        </Button>
        <Button
          onClick={goToNextDay}
          size="sm"
          variant="outline"
          aria-label="次の日"
        >
          <IoChevronForward />
        </Button>
        <Box ml={4} fontSize="md" fontWeight="medium">
          {formatSelectedDate()}
        </Box>
      </HStack>
      <Box position="relative" h={`${timelineHeight}px`} w="full">
        {/* 時刻軸 */}
        {hours.map((hour) => (
          <Box
            key={hour}
            position="absolute"
            top={`${(hour - firstHour) * 60}px`}
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
        {displayVideos.map((video: Video) => {
          const startMinutes = getMinutesFromStart(video.startedAt);
          const relativeStartMinutes = startMinutes - firstHour * 60;
          const durationMinutes = getDurationMinutes(
            video.startedAt,
            video.finishedAt,
          );
          const height = Math.max(durationMinutes, 20); // 最小20pxの高さ

          return (
            <HStack
              key={video.id}
              position="absolute"
              top={`${relativeStartMinutes}px`}
              left="80px"
              w="calc(100% - 100px)"
              h={`${height}px`}
              bg="gray.100"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="sm"
              p={2}
              gap={2}
              cursor="pointer"
              onClick={() => setSelectedVideo(video)}
              overflow="hidden"
            >
              <VideoThumbnail videoId={video.id} />
              <Box flex={1} overflow="hidden">
                <Box
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {video.title}
                </Box>
              </Box>
            </HStack>
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
    </Container>
  );
}
