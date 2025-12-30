import type { WithId } from "@/types/with-id";

import { getCollection } from "@/storage/collection/getCollection";
import { setCollection } from "@/storage/collection/setCollection";

export async function createEntry<T>(
  name: string,
  value: T
): Promise<WithId<T>> {
  const id = new Date().getTime().toString();
  const target = await getCollection(name);

  target[id] = value;

  await setCollection(name, target);

  return { id, ...value };
}
