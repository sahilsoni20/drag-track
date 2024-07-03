import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../types";

export function findValueOfItems(
  id: UniqueIdentifier | undefined,
  type: string,
  containers: ContainerType[]
) {
  if (type === "container") {
    return containers.find((container) => container.id === id);
  }
  if (type === "item") {
    return containers.find((container) => {
      return container.items.find((item) => item.id === id);
    });
  }
}
