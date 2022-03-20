import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { sortByField } from '../../utils/common';
import PhaseItem from './PhaseItem';

interface Iphase {
  id: string;
  name: string;
  order: number;
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: 'none',
  width: '100%',
  backgroundColor: 'white',
  marginBottom: '20px',
  color: 'black',
  ...draggableStyle,
});

export default function DragDrop(props: any) {
  const { id } = useParams();

  const { phases, programId, updatePhase } = props;

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newItems = [...phases];
    if (destination.index > source.index) {
      const changeItems = newItems.slice(source.index, destination.index + 1);
      changeItems.forEach((item, index) => {
        changeItems[index].order = item.order - 1;
      });
      changeItems[0].order = changeItems[changeItems.length - 1].order + 1;
    } else {
      const changeItems = newItems.slice(destination.index, source.index + 1);
      changeItems.forEach((item, index) => {
        changeItems[index].order = item.order + 1;
      });
      changeItems[changeItems.length - 1].order = changeItems[0].order - 1;
    }
    updatePhase(newItems);
  };

  return (
    <div className="DragDrop">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provide) => (
            <div
              className="todo"
              /* eslint-disable react/jsx-props-no-spreading */
              {...provide.droppableProps}
              ref={provide.innerRef}
            >
              {sortByField(phases, 'index')?.map(
                (phase: any, index: number) => (
                  <Draggable
                    draggableId={phase.id.toString()}
                    index={index}
                    key={phase.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <PhaseItem updatePhase={updatePhase} phase={phase} />
                      </div>
                    )}
                  </Draggable>
                )
              )}
              {provide.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
