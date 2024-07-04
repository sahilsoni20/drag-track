export function onAddContainer(
  containerName: string,
  setContainerName: (name: string) => void,
  setShowContainerModal: (show: boolean) => void,
  addContainer: (name: string) => void
) {
  if (!containerName) return;
  setContainerName("");
  setShowContainerModal(false);
  addContainer(containerName);
}
