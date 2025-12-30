import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "@/storage/entry/createEntry";
import type { Brewer } from "@/types/brewer";

export function useCreateBrewer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brewer: Brewer) => {
      return await createEntry("brewer", brewer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brewer"] });
    },
  });
}
