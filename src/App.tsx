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

  //dnd handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
