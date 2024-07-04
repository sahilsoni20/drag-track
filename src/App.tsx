import { useState } from "react";
import { Items, Input, Button, Container, Modal } from "./components";
import { v4 as uuidv4 } from 'uuid';

import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  item: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

function App() {
  const [containers, setContainers] = useState<DNDType[]>([
    {
      id: `container-${uuidv4()}`,
      title: 'Container 1',
      item: [
        {
          id: `item-${uuidv4()}`,
          title: 'Item 1'
        }
      ]
    },
    {
      id: `container-${uuidv4()}`,
      title: 'Container 2',
      item: [
        {
          id: `item-${uuidv4()}`,
          title: 'Item 2'
        }
      ]
    }
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const findValueOfItems = (id: UniqueIdentifier | undefined, type: string) => {
    if (type === "container") {
      return containers.find((container) => container.id === id);
    }
    if (type === "item") {
      return containers.find((container) => {
        return containers.find((item) => item.id === id);
      });
    }
  };

  //dnd handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = event;
    setActiveId(id);
  };

  const handleDragMove = (event: DragMoveEvent) => {
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
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

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
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeItemIndex,
          overItemIndex
        );
        setContainers(newItems);
      } else {
        //in different container
        let newItems = [...containers];
        const removedItems = newItems[activeContainerIndex].items.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overItemIndex,
          0,
          removedItems
        );
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
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      //if the active or over is undefined we are going to return
      if (!activeContainer === !overContainer) return;

      //find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );

      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      //find the index of active in active container
      const activeItemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      //remove the active item from active container
      let newItems = [...containers];
      const [removedItems] = newItems[activeContainerIndex].splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removedItems);
      setContainers(newItems);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex item-center justify-between gap-y-2">
        <h1 className="text-3xl font-bold">Drag Track</h1>
      </div>
      <div className="mt-10 text-black">
        <div className="grid grid-cols-3 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={containers.map((i) => {
                i.id;
              })}
            >
              {containers.map((container) => (
                <Container
                  key={container.id}
                  title={container.title}
                  id={container.id}
                  onAddItem={() => {}}
                >
                  {/* for internal items */}
                  <SortableContext items={container.items.map((i) => i.id)}>
                    <div className="flex items-start flex-col gap-y-4">
                      {container.items.map((item) => (
                        <Items
                          key={item.id}
                          id={item.id}
                          title={item.title}
                        ></Items>
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
export default App;
