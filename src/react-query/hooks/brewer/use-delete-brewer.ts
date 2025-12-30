import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEntry } from "@/storage/entry/deleteEntry";

type Payload = {
  id: string;
};

export function useDeleteBrewer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: Payload) => {
      return await deleteEntry("brewer", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brewer"] });
    },
  });
}
