import {
  Box,
  Heading,
  Text,
  Stack,
  Spinner,
  IconButton,
  Card,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useStatistics } from "../hooks/useStatistics";
import { useVideos } from "../hooks/useVideos";
import { calculatePeriodRange } from "../utils/dateFormat";
import StatisticsContent from "../components/statistics/StatisticsContent";

function StatisticsPrint() {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const { from, to } = calculatePeriodRange(currentDate, "month");
  const { data, isLoading, error } = useStatistics(from, to);
  const {
    data: videosData,
    isLoading: videosLoading,
    error: videosError,
  } = useVideos(1, 1000, from, to);

  const periodLabel = currentDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
  });

  const navigatePeriod = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    newDate.setHours(0, 0, 0, 0);
    setCurrentDate(newDate);
  };

  // カレンダー形式の作業日データを作成する
  const calendarDays = useMemo(() => {
    if (!videosData?.data) return [];

    // 作業データをマップに格納する
    const daysMap = new Map<string, { count: number; totalDuration: number }>();

    videosData.data.forEach((video) => {
      if (video.startedAt && video.finishedAt) {
        const date = new Date(video.startedAt);
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        const startedAt = new Date(video.startedAt);
        const finishedAt = new Date(video.finishedAt);
        const duration = Math.floor(
          (finishedAt.getTime() - startedAt.getTime()) / 1000,
        );

        const current = daysMap.get(dateKey) || { count: 0, totalDuration: 0 };
        daysMap.set(dateKey, {
          count: current.count + 1,
          totalDuration: current.totalDuration + duration,
        });
      }
    });

    // 月の全日付を生成する
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendar: Array<{
      date: string;
      day: number;
      isEmpty: boolean;
      count?: number;
      totalDuration?: number;
    }> = [];

    // 月初の曜日を取得（0=日曜日）
    const startDayOfWeek = firstDay.getDay();

    // 月初前の空白を追加
    for (let i = 0; i < startDayOfWeek; i++) {
      calendar.push({ date: "", day: 0, isEmpty: true });
    }

    // 月の各日を追加
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const data = daysMap.get(dateKey);

      if (data) {
        calendar.push({
          date: `${month + 1}/${day}`,
          day,
          isEmpty: false,
          count: data.count,
          totalDuration: data.totalDuration,
        });
      } else {
        calendar.push({
          date: `${month + 1}/${day}`,
          day,
          isEmpty: false,
        });
      }
    }

    return calendar;
  }, [videosData, currentDate]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}時間${minutes}分`;
    }
    return `${minutes}分`;
  };

  if (isLoading || videosLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
        <Text mt={4}>データを読み込んでいます...</Text>
      </Box>
    );
  }

  if (error || videosError) {
    return (
      <Box p={4}>
        <Text>統計の取得に失敗しました</Text>
      </Box>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <Box p={4}>
        <Text>データがありません</Text>
      </Box>
    );
  }

  return (
    <Box p={8} className="print-content">
      <Stack gap={6}>
        <Box>
          <Stack direction="row" justify="space-between" align="center" mb={2}>
            <Heading size="lg">統計レポート</Heading>
            <Stack direction="row" gap={1} className="no-print">
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
          <Text fontSize="md" color="gray.600">
            {periodLabel}
          </Text>
        </Box>

        <StatisticsContent items={data.items} total={data.total} />

        {/* 作業日カレンダー */}
        {calendarDays.length > 0 && (
          <Card.Root>
            <Card.Body>
              <Heading size="md" mb={4}>
                作業日
              </Heading>
              <Stack gap={2}>
                <Text fontSize="sm" color="gray.600">
                  {
                    calendarDays.filter((day) => day.count && day.count > 0)
                      .length
                  }
                  日間の作業記録
                </Text>

                {/* 曜日ヘッダー */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(7, 1fr)"
                  gap={1}
                  mb={1}
                >
                  {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
                    <Box
                      key={day}
                      textAlign="center"
                      fontSize="xs"
                      fontWeight="bold"
                      p={1}
                    >
                      {day}
                    </Box>
                  ))}
                </Box>

                {/* カレンダーグリッド */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(7, 1fr)"
                  gap={1}
                >
                  {calendarDays.map((day, index) => (
                    <Box
                      key={index}
                      p={2}
                      bg={day.isEmpty ? "transparent" : "gray.50"}
                      borderRadius="md"
                      fontSize="xs"
                      minH="60px"
                    >
                      {!day.isEmpty && (
                        <>
                          <Text fontWeight="medium" mb={1}>
                            {day.day}
                          </Text>
                          {day.count && day.count > 0 && (
                            <>
                              <Text color="gray.600" fontSize="2xs">
                                {day.count}件
                              </Text>
                              <Text
                                color="blue.600"
                                fontWeight="medium"
                                fontSize="2xs"
                              >
                                {formatDuration(day.totalDuration!)}
                              </Text>
                            </>
                          )}
                        </>
                      )}
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>
        )}
      </Stack>

      <style>{`
        @media print {
          @page {
            margin: 20mm;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print-content {
            page-break-after: avoid;
          }

          /* ナビゲーションやヘッダーを非表示にする */
          header, nav, footer, .no-print {
            display: none !important;
          }
        }

        @media screen {
          .print-content {
            max-width: 800px;
            margin: 0 auto;
          }
        }
      `}</style>
    </Box>
  );
}

export default StatisticsPrint;
