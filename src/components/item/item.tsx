import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";

type ItemProps = {
  id: UniqueIdentifier;
  title: string;
};

const Items = ({ id, title }: ItemProps) => {
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
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={clsx(
        "px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border" &&
          isDragging &&
          "opacity-50"
      )}
    >
        <div className="flex items-center justify-between">
            {title}
            <button className="border py-2 text-xs shadow-lg hover:shadow-xl" {...listeners}>
                drag    
            </button>
        </div>
    </div>
  );
};

export default Items;
