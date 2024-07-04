import { DragEndEvent } from "@dnd-kit/core";
import { ContainerType } from "../../types";
import { arrayMove } from "@dnd-kit/sortable";
import { findValueOfItems } from "../findValueOfItems";

export function handleDragEnd(
  event: DragEndEvent,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void
) {
  const { active, over } = event;

  //handle container sorting
  if (
    active.id.toString().includes("container") &&
    over?.id.toString().includes("container") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    const activeContainerIndex = containers.findIndex(
      (container) => container.id === active.id
    );

    const overContainerIndex = containers.findIndex(
      (container) => container.id === over.id
    );

    //swap the active and over container
    let newItems = [...containers];
    newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
    setContainers(newItems);
  }

  //handle item sorting
  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    //find active container and over container
    const activeContainer = findValueOfItems(active.id, "items", containers);
    const overContainer = findValueOfItems(over.id, "items", containers);

    //if the active or over container is undefiend we gonna return something something
    if (!activeContainer || !overContainer) return;

    //find active and over container index
    const activeContainerIndex = containers.findIndex(
      (container) => container.id === active.id
    );

    const overContainerIndex = containers.findIndex(
      (container) => container.id === over.id
    );

    //find the index of active and over item
    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id
    );

    const overItemIndex = overContainer.items.findIndex(
      (item) => item.id === over.id
    );

    //in the same container
    if (activeContainerIndex === overContainerIndex) {
      const newItems = [...containers];
      newItems[activeContainerIndex].items = arrayMove(
        newItems[activeContainerIndex].items,
        activeItemIndex,
        overItemIndex
      );
      setContainers(newItems);
    } else {
      //if we are in different container
      const newItems = [...containers];
      const [removedItem] = newItems[activeContainerIndex].items.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].items.splice(overItemIndex, 0, removedItem);
      setContainers(newItems);
    }
  }

  //handling drop item into container
  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    //find active container and over container
    const activeContainer = findValueOfItems(active.id, "items", containers);
    const overContainer = findValueOfItems(over.id, "items", containers);

    //if the active or over container is undefiend we gonna return something something
    if (!activeContainer || !overContainer) return;

    //find active and over container index
    const activeContainerIndex = containers.findIndex(
      (container) => container.id === active.id
    );

    const overContainerIndex = containers.findIndex(
      (container) => container.id === over.id
    );

    //find the index of active item in active container
    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id
    );

    const newItems = [...containers];
    const [removedItem] = newItems[activeContainerIndex].items.splice(
      activeItemIndex,
      1
    );
    newItems[overContainerIndex].items.push(removedItem);
    setContainers(newItems);
  }
}
