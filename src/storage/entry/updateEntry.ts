import { getCollection } from "@/storage/collection/getCollection";
import { setCollection } from "@/storage/collection/setCollection";

export async function updateEntry<T>(name: string, id: string, value: Partial<T>) {
  const target = await getCollection<T>(name);

  target[id] = { ...target[id], ...value };

  await setCollection(name, target);
}
