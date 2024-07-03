import { useState } from "react";
import Container from './components/container/container'

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
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";


type DNDtype = {
  id: UniqueIdentifier;
  title: string;
  item: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

function App() {
  const [container, setContainer] = useState<DNDtype>([]);
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

  const handleDragStart = (event: DragStartEvent) => {};

  const handleDragMove = (event: DragMoveEvent) => {};

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
            <SortableContext items={containers.map((container) => {
              container.id
            })}>
              {containers.map((container) => (
                <Container key={container.id}></Container>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
export default App;
