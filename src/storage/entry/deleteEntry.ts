import { getCollection } from "@/storage/collection/getCollection";
import { setCollection } from "@/storage/collection/setCollection";

export async function deleteEntry(name: string, id: string) {
  const target = await getCollection(name);

  delete target[id];

  await setCollection(name, target);
}
