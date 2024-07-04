import { UniqueIdentifier } from "@dnd-kit/core";

export function openEditItemModal(
  setEditingItem: (id: UniqueIdentifier | null) => void,
  setEditingItemName: (name: string) => void,
  setShowItemModal: (show: boolean) => void,
  id: UniqueIdentifier,
  title: string
) {
  setEditingItem(id);
  setEditingItemName(title);
  setShowItemModal(true);
}
