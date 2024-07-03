import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import Button from "../button/button";

type ContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
  onEditItem?: () => void;
  onDeleteItem?: () => void;
};

const Container = ({
  id,
  children,
  title,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={clsx(
        "w-full h-full p-4 bg-white rounded-xl flex flex-col gap-y-4", isDragging && 'opacity-50'
      )}
    >
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-black text-xl">{title}</h1>
            </div>
            <button className="border p-2 text-xs rounded-xl shadow-lg hover:shadow-xl" {...listeners} >
              drag
            </button>
        </div>
        {children}
        <Button variant='ghost' onClick={onAddItem}>
            Add Item
        </Button>
    </div>
  );
};

export default Container;
