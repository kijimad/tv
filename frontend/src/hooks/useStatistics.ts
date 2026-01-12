import { useQuery } from "@tanstack/react-query";
import { DefaultApi } from "../oapi/api";
import { AxiosError } from "axios";

const api = new DefaultApi();

export function useStatistics(
  startedAtFrom: Date,
  startedAtTo: Date,
  limit?: number,
) {
  return useQuery({
    queryKey: [
      "statistics",
      startedAtFrom.toISOString(),
      startedAtTo.toISOString(),
      limit,
    ],
    queryFn: async () => {
      const response = await api.statisticsAPIGet(
        startedAtFrom.toISOString(),
        startedAtTo.toISOString(),
        limit,
      );
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
