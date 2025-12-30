import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "@/storage/entry/createEntry";
import type { Coffee } from "@/types/coffee";

export function useCreateCoffee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (coffee: Coffee) => {
      return await createEntry("coffee", coffee);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffee"] });
    },
  });
}
