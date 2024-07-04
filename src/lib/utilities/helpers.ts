import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../types";

export const findContainerNameByItemId = (
  containers: ContainerType[],
  itemId: UniqueIdentifier | null
): string | undefined => {
  for (const container of containers) {
    if (container.items.some((item) => item.id === itemId)) {
      return container.title;
    }
  }
  return undefined;
};
