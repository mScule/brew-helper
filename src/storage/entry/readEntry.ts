import type { Nullable } from "@/types/nullable";

import { getCollection } from "@/storage/collection/getCollection";

export async function readEntry<T>(
  name: string,
  id: string
): Promise<Nullable<T>> {
  const target = await getCollection(name);

  const entry = target[id];

  if (!entry) {
    return null;
  }

  return entry as T;
}
