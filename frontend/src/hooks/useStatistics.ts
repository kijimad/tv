import { useQuery } from "@tanstack/react-query";
import { DefaultApi, StatisticsAPIGetPeriodEnum } from "../oapi/api";
import { AxiosError } from "axios";

const api = new DefaultApi();

export function useStatistics(
  period: StatisticsAPIGetPeriodEnum,
  baseDate?: string,
  limit?: number,
) {
  return useQuery({
    queryKey: ["statistics", period, baseDate, limit],
    queryFn: async () => {
      const response = await api.statisticsAPIGet(period, limit, baseDate);
      return response.data;
    },
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}
