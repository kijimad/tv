import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import type { SessionCreate, SessionUpdate } from "../oapi";

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionCreate: SessionCreate) => {
      const response = await apiClient.sessionsCreate(sessionCreate);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recordingStatus"] });
    },
  });
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      sessionUpdate,
    }: {
      id: number;
      sessionUpdate: SessionUpdate;
    }) => {
      const response = await apiClient.sessionsUpdate(id, sessionUpdate);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recordingStatus"] });
    },
  });
};
