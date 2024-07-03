import { useState } from "react";
import { Items, Input, Button, Container } from "./components";

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
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

type DNDtype = {
  id: UniqueIdentifier;
  title: string;
  item: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

function App() {
  const [containers, setContainers] = useState<DNDtype>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const findValueOfItems = (id: UniqueIdentifier | undefined, type: string) => {
    if(type === 'container') {
      return containers.find((container) => container.id === id)
    }
    if(type === 'item') {
     return containers.find((container) => {
      return containers.find((item) => item.id === id)
     })
    }
  }

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
      const activeContainer  = findValueOfItems(active.id, 'item')
      const overContainer = findValueOfItems(over.id, 'item')

      //if the active or over container is undefined (dosent exsist) then return 
      if(!activeContainer || !overContainer ) {
        return const activeContainerIndex = containers.findIndex(
          
        ) 
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex item-center justify-between gap-y-2">
        <h1 className="text-3xl font-bold">Drag Track</h1>
      </div>
      <div className="mt-10">
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
