import type { Collection } from "@/types/collection";

export async function getCollection<T>(name: string): Promise<Collection<T>> {
  try {
    const serialized = localStorage.getItem(name);

    if (!serialized) {
      return {};
    }

    const parsed = JSON.parse(serialized);

    if (!parsed) {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}
