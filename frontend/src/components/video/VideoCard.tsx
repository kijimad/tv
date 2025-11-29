import { Card, Heading, Image, Text } from "@chakra-ui/react";
import type { Video } from "../../oapi";
import { formatDate } from "../../utils/dateFormat";
import { useThumbnail } from "../../hooks/useThumbnail";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailUrl = useThumbnail(video.id);

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
        <Heading size="md">{video.title}</Heading>
        <Text fontSize="sm">{formatDate(video.startedAt)}</Text>
      </Card.Body>
    </Card.Root>
  );
}
