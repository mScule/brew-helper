import type { Collection } from "@/types/collection";

export async function setCollection<T>(name: string, state: Collection<T>) {
  const serialized = JSON.stringify(state);
  localStorage.setItem(name, serialized);
}
