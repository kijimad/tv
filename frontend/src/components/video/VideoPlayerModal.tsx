import { Dialog, Editable, HStack, IconButton, Button } from "@chakra-ui/react";
import type { Video } from "../../oapi";
import { useVideoFile } from "../../hooks/useVideoFile";
import { useUpdateVideo, useDeleteVideo } from "../../hooks/useVideoMutations";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useState } from "react";

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
  const updateVideo = useUpdateVideo();
  const deleteVideo = useDeleteVideo();
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleUpdate = (newTitle: string) => {
    if (newTitle.trim() === "" || newTitle === video.title) {
      setIsEditing(false);
      return;
    }

    updateVideo.mutate(
      {
        id: video.id,
        videoUpdate: { title: newTitle },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!window.confirm("この動画を削除しますか？")) {
      return;
    }

    deleteVideo.mutate(video.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

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
            <HStack gap={2}>
              <Editable.Root
                defaultValue={video.title}
                onValueCommit={(e) => handleTitleUpdate(e.value)}
                flex={1}
              >
                <Editable.Preview />
                <Editable.Input />
                <Editable.Control>
                  {isEditing ? (
                    <HStack gap={1}>
                      <Editable.SubmitTrigger asChild>
                        <IconButton aria-label="保存" size="xs" variant="ghost">
                          <IoCheckmark />
                        </IconButton>
                      </Editable.SubmitTrigger>
                      <Editable.CancelTrigger asChild>
                        <IconButton
                          aria-label="キャンセル"
                          size="xs"
                          variant="ghost"
                          onClick={() => setIsEditing(false)}
                        >
                          <IoClose />
                        </IconButton>
                      </Editable.CancelTrigger>
                    </HStack>
                  ) : (
                    <Editable.EditTrigger asChild>
                      <IconButton
                        aria-label="編集"
                        size="xs"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                      ></IconButton>
                    </Editable.EditTrigger>
                  )}
                </Editable.Control>
              </Editable.Root>
            </HStack>
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
          <Dialog.Footer>
            <Button
              colorPalette="red"
              variant="outline"
              onClick={handleDelete}
              size="sm"
            >
              削除
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
