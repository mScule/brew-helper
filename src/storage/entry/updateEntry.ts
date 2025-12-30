import { getCollection } from "@/storage/collection/getCollection";
import { setCollection } from "@/storage/collection/setCollection";

export async function updateEntry<T>(name: string, id: string, value: T) {
  const target = await getCollection(name);

  target[id] = value;

  await setCollection(name, target);
}
