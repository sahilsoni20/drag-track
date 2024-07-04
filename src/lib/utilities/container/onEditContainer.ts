import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onEditContainer(
  editingContainerName: string,
  editingContainer: UniqueIdentifier | null,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void,
  setEditingContainerName: (name: string) => void,
  setEditingContainer: (id: UniqueIdentifier | null) => void,
  setShowEditContainerModal: (show: boolean) => void
) {
  if (!editingContainer || !editingContainerName) return;
  const container = containers.find((item) => item.id === editingContainer);
  if (!container) return;
  container.title = editingContainerName;
  setContainers([...containers]);
  setEditingContainer(null);
  setShowEditContainerModal(false);
  setEditingContainerName("");
}
