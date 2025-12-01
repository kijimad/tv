import {
  Heading,
  Box,
  Spinner,
  Text,
  HStack,
  Badge,
  Card,
} from "@chakra-ui/react";
import { useRecordingStatus } from "../../hooks/useRecordingStatus";

// RecordingInfoの型定義
type RecordingStatus =
  | "idle"
  | "recording"
  | "processing"
  | "success"
  | "failed";

interface RecordingInfo {
  status: RecordingStatus;
  filename: string;
  title?: string;
}

// ステータスのバッジカラーを返す
const getStatusColor = (status: RecordingStatus) => {
  switch (status) {
    case "recording":
      return "red";
    case "processing":
      return "yellow";
    case "success":
      return "green";
    case "failed":
      return "red";
    default:
      return "gray";
  }
};

// ステータスの日本語ラベルを返す
const getStatusLabel = (status: RecordingStatus) => {
  switch (status) {
    case "idle":
      return "待機中";
    case "recording":
      return "録画中";
    case "processing":
      return "変換中";
    case "success":
      return "完了";
    case "failed":
      return "失敗";
    default:
      return status;
  }
};

export default function RecordingStatusList() {
  const { data, isLoading, error } = useRecordingStatus();

  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <Spinner size="sm" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Text>録画状態の取得に失敗しました</Text>
      </Box>
    );
  }

  if (!data || !Array.isArray(data)) {
    return null;
  }

  // 実行中のジョブのみをフィルタリングする
  const runningJobs = (data as RecordingInfo[]).filter(
    (info) => info.status === "recording" || info.status === "processing",
  );

  if (runningJobs.length === 0) {
    return null;
  }

  return (
    <Box mb={6}>
      <Heading size="lg" mb={3}>
        実行中のジョブ
      </Heading>

      {runningJobs.map((info) => (
        <Card.Root key={info.filename} mb={2}>
          <Card.Body>
            <HStack justify="space-between">
              <Box flex="1">
                <Text>{info.title || info.filename}</Text>
                <Text fontSize="sm" color="gray.600">
                  {info.filename}
                </Text>
              </Box>
              <Badge colorScheme={getStatusColor(info.status)}>
                {getStatusLabel(info.status)}
              </Badge>
            </HStack>
          </Card.Body>
        </Card.Root>
      ))}
    </Box>
  );
}
