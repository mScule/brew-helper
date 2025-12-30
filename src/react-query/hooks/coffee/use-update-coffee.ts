import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "@/storage/entry/updateEntry";
import type { Coffee } from "@/types/coffee";

type Payload = {
  id: string;
  coffee: Partial<Coffee>;
};

export function useUpdateCoffee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, coffee }: Payload) => {
      return await updateEntry<Coffee>("coffee", id, coffee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffee"] });
    },
  });
}
