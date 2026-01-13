import {
  Box,
  Heading,
  Grid,
  Text,
  Stack,
  Spinner,
  IconButton,
  Card,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStatistics } from "../../hooks/useStatistics";
import { calculatePeriodRange } from "../../utils/dateFormat";
import StatisticsContent from "./StatisticsContent";

type PeriodType = "day" | "week" | "month";

function StatisticsPanel({
  period,
  title,
  controlledDate,
  onDateChange,
}: {
  period: PeriodType;
  title: string;
  controlledDate?: Date;
  onDateChange?: (date: Date) => void;
}) {
  const [internalDate, setInternalDate] = useState(() => {
    // ブラウザのローカルタイムゾーンでの現在日付（00:00:00）を取得する
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const currentDate = controlledDate ?? internalDate;
  const setCurrentDate = onDateChange ?? setInternalDate;

  const navigatePeriod = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);

    if (period === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (period === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else if (period === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }

    newDate.setHours(0, 0, 0, 0);
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
      // 週の開始日（月曜日）を計算する
      const weekStart = new Date(currentDate);
      const weekday = weekStart.getDay();
      const daysToMonday = weekday === 0 ? -6 : 1 - weekday;
      weekStart.setDate(currentDate.getDate() + daysToMonday);

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

  const { from, to } = calculatePeriodRange(currentDate, period);
  const { data, isLoading, error } = useStatistics(from, to);

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
          <StatisticsContent items={data.items} total={data.total} />
        )}
      </Card.Body>
    </Card.Root>
  );
}

function Statistics() {
  const navigate = useNavigate();
  const [monthDate, setMonthDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const { from, to } = calculatePeriodRange(monthDate, "month");
  const { data: monthData } = useStatistics(from, to);

  const handlePrintPreview = () => {
    navigate("/statistics/report");
  };

  return (
    <Box mb={8}>
      <Stack direction="row" justify="space-between" align="center" mb={4}>
        <Heading size="lg">統計</Heading>
        {monthData && monthData.items.length > 0 && (
          <Button size="sm" onClick={handlePrintPreview} variant="outline">
            <FaFileAlt />
            <Text ml={2}>レポート</Text>
          </Button>
        )}
      </Stack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
        <StatisticsPanel period="day" title="日" />
        <StatisticsPanel period="week" title="週" />
        <StatisticsPanel
          period="month"
          title="月"
          controlledDate={monthDate}
          onDateChange={setMonthDate}
        />
      </Grid>
    </Box>
  );
}

export default Statistics;
