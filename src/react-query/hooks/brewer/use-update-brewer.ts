import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "@/storage/entry/updateEntry";
import type { Brewer } from "@/types/brewer";

type Payload = {
  id: string;
  brewer: Partial<Brewer>;
};

export function useUpdateBrewer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, brewer }: Payload) => {
      return await updateEntry<Brewer>("brewer", id, brewer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brewer"] });
    },
  });
}
