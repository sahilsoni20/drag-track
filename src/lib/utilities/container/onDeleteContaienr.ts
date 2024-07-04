import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onDeleteContainer(
  id: UniqueIdentifier | null,
  containers: ContainerType[],
  setContainers: (container: ContainerType[]) => void
) {
  setContainers(containers.filter((container) => container.id !== id));
}
