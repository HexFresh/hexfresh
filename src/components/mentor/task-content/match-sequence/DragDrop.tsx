import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { Droppable, DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { sortByField } from '../../../../utils/common';
import { InputBase } from '@mui/material';
import { deleteOption } from '../../../../api/mentor/MatchSequenceApi';

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
  const { options, updateOptions, fecthOptions, taskId } = props;
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

  const handleRemoveOption = (id: number) => {
    const removeOption = async () => {
      await deleteOption(taskId, id);
      fecthOptions();
      message.success('Deleted', 0.5);
    };
    removeOption();
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
                        <div className="option-index">{index + 1}</div>
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
                        <div className="remove-btn">
                          <MinusCircleOutlined
                            className="remove-icon"
                            style={{ fontSize: '25px', color: 'gray' }}
                            onClick={() => handleRemoveOption(option.id)}
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
