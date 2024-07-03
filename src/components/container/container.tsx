import { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable";


type ContainerProps = {
    id: UniqueIdentifier,
    children: React.ReactNode,
    title?: string,
    description?: string,
    onAddItem?: () => void;
    onEditItem?: () => void;
    onDeleteItem?: () => void;
}

const Container = ({id, children, title, description, onAddItem, onEditItem, onDeleteItem}: ContainerProps) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: id,
        data: {
            type: 'container'
        }
    })
 
  return (
    <div {...attributes} ref={setNodeRef} style={{transform: CSS.Translate.toString(transform), transition}}>
        
    </div>
  )
}

export default Container
