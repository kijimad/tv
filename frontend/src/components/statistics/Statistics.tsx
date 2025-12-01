import {
  Box,
  Heading,
  Grid,
  Text,
  Stack,
  Spinner,
  IconButton,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useStatistics } from "../../hooks/useStatistics";
import type { StatisticsAPIGetPeriodEnum } from "../../oapi/api";

function StatisticsPanel({
  period,
  title,
}: {
  period: StatisticsAPIGetPeriodEnum;
  title: string;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigatePeriod = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (period === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (period === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else if (period === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatPeriodLabel = (): string => {
    if (period === "day") {
      return currentDate.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } else if (period === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString("ja-JP", {
        month: "2-digit",
        day: "2-digit",
      })} - ${weekEnd.toLocaleDateString("ja-JP", {
        month: "2-digit",
        day: "2-digit",
      })}`;
    } else {
      return currentDate.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
      });
    }
  };

  const baseDate = currentDate.toISOString();
  const { data, isLoading, error } = useStatistics(period, baseDate);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}時間${minutes}分`;
    }
    return `${minutes}分`;
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Text>統計の取得に失敗しました</Text>
      </Box>
    );
  }

  return (
    <Card.Root>
      <Card.Body>
        <Stack direction="row" justify="space-between" align="center" mb={4}>
          <Heading size="md">{title}</Heading>
          <Stack direction="row" gap={1}>
            <IconButton
              aria-label="前へ"
              size="sm"
              onClick={() => navigatePeriod("prev")}
              variant="outline"
            >
              <FaChevronLeft />
            </IconButton>
            <IconButton
              aria-label="次へ"
              size="sm"
              onClick={() => navigatePeriod("next")}
              variant="outline"
            >
              <FaChevronRight />
            </IconButton>
          </Stack>
        </Stack>

        <Text fontSize="sm" mb={4}>
          {formatPeriodLabel()}
        </Text>

        {!data || data.items.length === 0 ? (
          <Text textAlign="center" py={8}>
            データがありません
          </Text>
        ) : (
          <>
            <Box mb={4}>
              <Text fontSize="sm" mb={1}>
                合計時間
              </Text>
              <Text fontSize="xl">{formatDuration(data.total)}</Text>
            </Box>

            <Stack gap={3}>
              {data.items.map((item, index) => (
                <Card.Root key={index} variant="subtle">
                  <Card.Body>
                    <Stack direction="row" justify="space-between" mb={2}>
                      <Text fontSize="sm">{item.title}</Text>
                      <Text fontSize="sm">{formatDuration(item.duration)}</Text>
                    </Stack>
                    <Stack direction="row" align="center" gap={2}>
                      <Box flex={1} h="8px" overflow="hidden">
                        <Box
                          h="full"
                          bg="blue.500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </Box>
                      <Text fontSize="xs" minW="45px" textAlign="right">
                        {item.percentage.toFixed(1)}%
                      </Text>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </Stack>
          </>
        )}
      </Card.Body>
    </Card.Root>
  );
}

function Statistics() {
  return (
    <Box mb={8}>
      <Heading size="lg" mb={4}>
        統計
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <StatisticsPanel period="day" title="日" />
        <StatisticsPanel period="week" title="週" />
        <StatisticsPanel period="month" title="月" />
      </Grid>
    </Box>
  );
}

export default Statistics;
