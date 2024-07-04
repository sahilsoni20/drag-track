import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";
import { findValueOfItems } from "../findValueOfItems";

export function findContainerItem(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined
) {
  const container = findValueOfItems( id, "item", containers);
  if (!container) return [];
  return container.items;
}
