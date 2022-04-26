import * as React from 'react';
import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder
} from 'react-beautiful-dnd';

export type DraggableListProps = {
  items: any[];
  isDragDisabled: boolean;
  component: any;
  onDragEnd: OnDragEndResponder;
};

const DraggableList = React.memo(({ items,isDragDisabled, component, onDragEnd }: DraggableListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <DraggableListItem isDragDisabled={isDragDisabled} component={component} item={item} itemId={item.id} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
