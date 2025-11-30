import { useQuery } from "@tanstack/react-query";
import { DefaultApi, StatisticsAPIGetPeriodEnum } from "../oapi/api";
import { AxiosError } from "axios";

const api = new DefaultApi();

export function useStatistics(period: StatisticsAPIGetPeriodEnum) {
  return useQuery({
    queryKey: ["statistics", period],
    queryFn: async () => {
      const response = await api.statisticsAPIGet(period);
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
