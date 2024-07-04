import { DragMoveEvent } from "@dnd-kit/core";
import { ContainerType } from "../../types";
import { findValueOfItems } from "../findValueOfItems";
import { arrayMove } from "@dnd-kit/sortable";

export function handleDragMove(
  event: DragMoveEvent,
  containers: ContainerType[],
  setContainers: (container: ContainerType[]) => void
) {
  const { active, over } = event;

  //handle item sorting
  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    //find the active container and hover that
    const activeContainer = findValueOfItems(active.id, "item", containers);
    const overContainer = findValueOfItems(over.id, "item", containers);

    // if the active or over container is undefined (dosent exsist) then return
    if (!activeContainer || !overContainer) return;

    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer.id
    );
    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer.id
    );

    //find the index of the active and over item
    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id
    );

    const overItemIndex = overContainer.items.findIndex(
      (item) => item.id === over.id
    );

    //check if dragging in the same container
    if (activeContainerIndex === overContainerIndex) {
      const newItems = [...containers];
      newItems[activeContainerIndex].items = arrayMove(
        newItems[activeContainerIndex].items,
        activeItemIndex,
        overItemIndex
      );
      setContainers(newItems);
    } else {
      //in different container
      const newItems = [...containers];
      const [removedItems] = newItems[activeContainerIndex].items.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].items.splice(overItemIndex, 0, removedItems);
      setContainers(newItems);
    }
  }

  //handling item drop into a container
  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("container") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    //find the active and over container
    const activeContainer = findValueOfItems(active.id, "item", containers);
    const overContainer = findValueOfItems(over.id, "container", containers);

    //if the active or over is undefined we are going to return
    if (!activeContainer || !overContainer) return; 

    //find the index of the active and over container
    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer?.id
    );

    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer?.id
    );

    //find the index of active in active container
    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id
    );

    //remove the active item from active container
    const newItems = [...containers];
    const [removedItems] = newItems[activeContainerIndex].items.splice(
      activeItemIndex,
      1
    );
    newItems[overContainerIndex].items.push(removedItems);
    setContainers(newItems);
  }
}
