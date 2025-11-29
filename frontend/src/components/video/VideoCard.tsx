import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import type { Video } from "../../oapi";
import { formatDate } from "../../utils/dateFormat";
import { useThumbnail } from "../../hooks/useThumbnail";
import {
  useStopVideo,
  useProcessVideo,
  useCompleteVideo,
  useFailVideo,
  useRetryVideo,
} from "../../hooks/useVideoMutations";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailUrl = useThumbnail(video.id);
  const stopVideo = useStopVideo();
  const processVideo = useProcessVideo();
  const completeVideo = useCompleteVideo();
  const failVideo = useFailVideo();
  const retryVideo = useRetryVideo();

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.id) stopVideo.mutate(video.id);
  };

  const handleProcess = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.id) processVideo.mutate(video.id);
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.id) completeVideo.mutate(video.id);
  };

  const handleFail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.id) failVideo.mutate(video.id);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.id) retryVideo.mutate(video.id);
  };

  const getStatusBadge = (status: string) => {
    const colorMap: Record<string, string> = {
      recording: "blue",
      pending: "yellow",
      processing: "purple",
      ready: "green",
      failed: "red",
      cancelled: "gray",
      archived: "gray",
    };
    return <Badge colorPalette={colorMap[status] || "gray"}>{status}</Badge>;
  };

  return (
    <Card.Root onClick={onClick} cursor="pointer">
      <Image
        src={thumbnailUrl}
        alt={video.title}
        objectFit="cover"
        height="200px"
        width="100%"
      />
      <Card.Body gap={2}>
        <Flex justify="space-between" align="center">
          <Heading size="md">{video.title}</Heading>
          {getStatusBadge(video.processingStatus || "ready")}
        </Flex>
        <Text fontSize="sm">{formatDate(video.startedAt)}</Text>

        {video.processingStatus === "recording" && (
          <Button size="sm" onClick={handleStop} colorPalette="orange">
            停止
          </Button>
        )}
        {video.processingStatus === "pending" && (
          <Button size="sm" onClick={handleProcess} colorPalette="purple">
            変換開始
          </Button>
        )}
        {video.processingStatus === "processing" && (
          <Flex gap={2}>
            <Button size="sm" onClick={handleComplete} colorPalette="green">
              完了
            </Button>
            <Button size="sm" onClick={handleFail} colorPalette="red">
              失敗
            </Button>
          </Flex>
        )}
        {video.processingStatus === "failed" && (
          <Button size="sm" onClick={handleRetry} colorPalette="yellow">
            再試行
          </Button>
        )}
      </Card.Body>
    </Card.Root>
  );
}
