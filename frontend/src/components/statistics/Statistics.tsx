import { Box, Heading, Grid, Text, Stack, Spinner } from "@chakra-ui/react";
import { useStatistics } from "../../hooks/useStatistics";
import type { StatisticsAPIGetPeriodEnum } from "../../oapi/api";

function StatisticsPanel({
  period,
  title,
}: {
  period: StatisticsAPIGetPeriodEnum;
  title: string;
}) {
  const { data, isLoading, error } = useStatistics(period);

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.50" borderRadius="md">
        <Text color="red.600">統計の取得に失敗しました</Text>
      </Box>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <Text color="gray.500" textAlign="center" py={8}>
        データがありません
      </Text>
    );
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}時間${minutes}分`;
    }
    return `${minutes}分`;
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="white">
      <Heading size="md" mb={4}>
        {title}
      </Heading>

      <Box mb={4}>
        <Text fontSize="sm" color="gray.600" mb={1}>
          合計時間
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {formatDuration(data.total)}
        </Text>
      </Box>

      <Stack gap={3}>
        {data.items.map((item, index) => (
          <Box key={index} p={3} borderWidth={1} borderRadius="md" bg="gray.50">
            <Stack direction="row" justify="space-between" mb={2}>
              <Text fontWeight="medium" fontSize="sm">
                {item.title}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {formatDuration(item.duration)}
              </Text>
            </Stack>
            <Stack direction="row" align="center" gap={2}>
              <Box
                flex={1}
                h="8px"
                bg="gray.200"
                borderRadius="full"
                overflow="hidden"
              >
                <Box
                  h="full"
                  bg="blue.500"
                  style={{ width: `${item.percentage}%` }}
                />
              </Box>
              <Text
                fontSize="xs"
                color="gray.600"
                minW="45px"
                textAlign="right"
              >
                {item.percentage.toFixed(1)}%
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
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
