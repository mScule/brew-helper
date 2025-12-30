import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/storage/collection/getCollection";

import type { Coffee } from "@/types/coffee";

export function useQueryAllCoffee() {
  return useQuery({
    queryKey: ["coffee"],
    queryFn: async () => {
      const collection = await getCollection<Coffee>("coffee");

      return Object.entries(collection).map(([key, value]) => ({
        id: key,
        ...value,
      }));
    },
  });
}
