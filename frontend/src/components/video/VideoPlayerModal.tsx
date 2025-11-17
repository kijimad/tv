import { Dialog } from "@chakra-ui/react";
import type { Video } from "../../oapi";
import { useVideoFile } from "../../hooks/useVideoFile";

interface VideoPlayerModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayerModal({
  video,
  isOpen,
  onClose,
}: VideoPlayerModalProps) {
  const videoUrl = useVideoFile(video.id);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      size="xl"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="60vw">
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>{video.title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <video
              src={videoUrl}
              controls
              autoPlay
              onError={(e) => {
                console.error("Video error:", e);
              }}
              onLoadStart={() => {
                console.log("Video loading started:", videoUrl);
              }}
            >
              お使いのブラウザは動画の再生に対応していません。
            </video>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
