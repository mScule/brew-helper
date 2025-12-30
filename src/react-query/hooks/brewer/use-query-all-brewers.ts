import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/storage/collection/getCollection";

import type { Brewer } from "@/types/brewer";

export function useQueryAllBrewers() {
  return useQuery({
    queryKey: ["brewer"],
    queryFn: async () => {
      const collection = await getCollection<Brewer>("brewer");

      return Object.entries(collection).map(([key, value]) => ({
        id: key,
        ...value,
      }));
    },
  });
}
