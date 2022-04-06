import React from 'react';
import { Droppable, DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { sortByField } from '../../../../utils/common';
import { InputBase } from '@mui/material';
import { getAllOption, createOption, updateBulkOption } from '../../../../api/mentor/MatchSequenceApi';

interface MatchSequenceOption {
  id: number;
  taskId: number;
  content: string;
  index: number;
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: 'none',
  width: '100%',
  backgroundColor: 'transparent',
  marginBottom: '20px',
  color: 'black',
  ...draggableStyle,
});

export default function DragDrop(props: any) {
  const { options, updateOptions } = props;
  const [currentoptions, setCurrentOptions] = React.useState<MatchSequenceOption[]>([]);

  React.useEffect(() => {
    setCurrentOptions(options);
    return () => setCurrentOptions([]);
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newItems = [...options];
    if (destination.index > source.index) {
      const changeItems = newItems.slice(source.index, destination.index + 1);
      changeItems.forEach((item, index) => {
        changeItems[index].index = item.index - 1;
      });
      changeItems[0].index = changeItems[changeItems.length - 1].index + 1;
    } else {
      const changeItems = newItems.slice(destination.index, source.index + 1);
      changeItems.forEach((item, index) => {
        changeItems[index].index = item.index + 1;
      });
      changeItems[changeItems.length - 1].index = changeItems[0].index - 1;
    }
    setCurrentOptions(newItems);

    const sendOptions = newItems.map((item: MatchSequenceOption) => {
      return {
        ...item,
        optionId: item.id,
      };
    });
    updateOptions(sendOptions);
  };

  const handleUpdateContent = () => {
    const sendOptions = currentoptions.map((item: MatchSequenceOption) => {
      return {
        ...item,
        optionId: item.id,
      };
    });
    updateOptions(sendOptions);
  };

  return (
    <div className="DragDrop">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provide) => (
            <div
              /* eslint-disable react/jsx-props-no-spreading */
              {...provide.droppableProps}
              ref={provide.innerRef}
            >
              {sortByField(currentoptions, 'index')?.map((option: any, index: number) => (
                <Draggable draggableId={option.id.toString()} index={index} key={option.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <div className="option">
                        <div className="option-index">{option.index}</div>
                        <div className="option-content">
                          <InputBase
                            className="input-base"
                            multiline
                            maxRows={10}
                            sx={{ width: '100%', fontSize: '18px' }}
                            value={option.content || ''}
                            onChange={(e) => {
                              const newOptions = [...options];
                              newOptions[index].content = e.target.value;
                              setCurrentOptions(newOptions);
                            }}
                            onBlur={handleUpdateContent}
                            placeholder="Fill answer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provide.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
