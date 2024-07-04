import { ContainerType } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";

export function onAddItem(
  itemName: string,
  setItemName: (name: string) => void,
  setShowAddItemModal: (show: boolean) => void,
  containers: ContainerType[],
  setContainer: (containers: ContainerType[]) => void,
  currentContainerId: UniqueIdentifier | null
) {
  if (itemName) return;
  const id = `item-${Math.random() * 1000}`;
  const container = containers.find((item) => item.id === currentContainerId);
  if (!container) return;
  container.items.push({
    id,
    title: itemName,
  });
  setContainer([...containers]);
  setItemName("");
  setShowAddItemModal(false);
}
