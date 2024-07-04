import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { Grip } from "lucide-react";

type ItemProps = {
  id: UniqueIdentifier;
  title: string;
  onEdit?: () => void;
};

const Items = ({ id, title, onEdit }: ItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <div
      {...attributes}
      onClick={onEdit}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={clsx(
        "bg-white shadow rounded-md w-full border border-slate-200 hover:border-gray-200 flex relative items-start p-3",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        {title}
        <button
          className="text-gray-400 hover:text-indigo-500 transition-colors p-1 cursor-grab"
          {...listeners}
        >
          <Grip size={17} />
        </button>
      </div>
    </div>
  );
};

export default Items;
