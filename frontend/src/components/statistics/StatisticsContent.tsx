import { Box, Text, Stack, Card, Center } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// 円グラフの色パレット
const COLORS = [
  "#3182CE", // blue.500
  "#38B2AC", // teal.500
  "#DD6B20", // orange.500
  "#9F7AEA", // purple.500
  "#ED8936", // orange.400
  "#48BB78", // green.500
  "#ECC94B", // yellow.400
  "#ED64A6", // pink.400
];

interface StatisticsItem {
  title: string;
  duration: number;
  percentage: number;
}

interface StatisticsContentProps {
  items: StatisticsItem[];
  total: number;
}

function StatisticsContent({ items, total }: StatisticsContentProps) {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}時間${minutes}分`;
    }
    return `${minutes}分`;
  };

  return (
    <>
      <Box mb={4}>
        <Text fontSize="sm" mb={1}>
          合計時間
        </Text>
        <Text fontSize="xl">{formatDuration(total)}</Text>
      </Box>

      {/* 円グラフ */}
      <Center mb={6}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={items.map((item) => ({
                name: item.title,
                value: item.duration,
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {items.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatDuration(value)} />
          </PieChart>
        </ResponsiveContainer>
      </Center>

      {/* 横棒グラフ */}
      <Stack gap={3}>
        {items.map((item, index) => (
          <Card.Root key={index} variant="subtle">
            <Card.Body>
              <Stack direction="row" justify="space-between" mb={2}>
                <Stack direction="row" align="center" gap={2}>
                  <Text fontSize="sm">{item.title}</Text>
                </Stack>
                <Text fontSize="sm">{formatDuration(item.duration)}</Text>
              </Stack>
              <Stack direction="row" align="center" gap={2}>
                <Box flex={1} h="8px" overflow="hidden">
                  <Box
                    h="full"
                    bg={COLORS[index % COLORS.length]}
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
  );
}

export default StatisticsContent;
