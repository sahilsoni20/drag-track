import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../types";

export const isContainerEmpty = (containerName: string): boolean => {
  return containerName.trim() === "";
};

export const isItemEmpty = (ItemName: string): boolean => {
  return ItemName.trim() === "";
};

export const isEditingContainerNameChanged = (
  editingContainerName: string,
  editingContainer: UniqueIdentifier | null,
  containers: ContainerType[]
): boolean => {
  return (
    editingContainerName.trim() !== "" &&
    containers.some(
      (container) =>
        container.id === editingContainer &&
        container.title !== editingContainerName.trim()
    )
  );
};

export const isEditingItemNameChanged = (
  editingItemName: string,
  editingItem: UniqueIdentifier | null,
  containers: ContainerType[]
): boolean => {
  return (
    editingItemName.trim() !== "" &&
    containers.some(
      (item) => item.id === editingItem && item.title !== editingItemName.trim()
    )
  );
};
