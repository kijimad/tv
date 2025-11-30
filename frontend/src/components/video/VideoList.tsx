import {
  Box,
  Grid,
  Spinner,
  Text,
  IconButton,
  HStack,
  Table,
} from "@chakra-ui/react";
import { useVideos } from "../../hooks/useVideos";
import VideoCard from "./VideoCard";
import { useState } from "react";
import VideoPlayerModal from "./VideoPlayerModal";
import type { Video } from "../../oapi";
import { IoGrid, IoList } from "react-icons/io5";
import Pagination from "./Pagination";

type ViewMode = "grid" | "table";

export default function VideoList() {
  const [page, setPage] = useState(1);
  const [size] = useState(32);
  const { data, isLoading, error } = useVideos(page, size);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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

  if (!data?.data || data.data.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">録画データがありません</Text>
      </Box>
    );
  }

  // 動画の長さ（分）を計算する
  const getDurationMinutes = (startedAt: string, finishedAt?: string) => {
    if (!finishedAt) return 0;
    const start = new Date(startedAt);
    const end = new Date(finishedAt);
    return Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
  };

  // 時間を HH:MM 形式にフォーマットする
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}時間${mins}分`;
  };

  // 総ページ数を計算する
  const totalPages = data?.pager
    ? Math.ceil(data.pager.totalCount / data.pager.size)
    : 0;

  return (
    <>
      <Box mb={4}>
        <HStack gap={2} justify="flex-end">
          <IconButton
            aria-label="グリッド表示"
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "solid" : "outline"}
            size="sm"
          >
            <IoGrid />
          </IconButton>
          <IconButton
            aria-label="テーブル表示"
            onClick={() => setViewMode("table")}
            variant={viewMode === "table" ? "solid" : "outline"}
            size="sm"
          >
            <IoList />
          </IconButton>
        </HStack>
      </Box>

      {viewMode === "grid" ? (
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          w="full"
        >
          {data.data.map((video: Video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </Grid>
      ) : (
        <Box overflowX="auto">
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>タイトル</Table.ColumnHeader>
                <Table.ColumnHeader>開始時刻</Table.ColumnHeader>
                <Table.ColumnHeader>長さ</Table.ColumnHeader>
                <Table.ColumnHeader>作成日時</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.data.map((video: Video) => (
                <Table.Row
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                >
                  <Table.Cell>{video.title}</Table.Cell>
                  <Table.Cell>
                    {new Date(video.startedAt).toLocaleString("ja-JP")}
                  </Table.Cell>
                  <Table.Cell>
                    {formatDuration(
                      getDurationMinutes(video.startedAt, video.finishedAt),
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(video.createdAt).toLocaleString("ja-JP")}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

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
