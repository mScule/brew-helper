import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEntry } from "@/storage/entry/deleteEntry";

type Payload = {
  id: string;
};

export function useDeleteCoffee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: Payload) => {
      return await deleteEntry("coffee", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffee"] });
    },
  });
}
