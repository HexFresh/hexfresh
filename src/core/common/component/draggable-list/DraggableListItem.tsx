import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

export type DraggableListItemProps = {
  component: any;
  itemId: string;
  item: any;
  index: number;
};

const useStyles: any = makeStyles({
  draggingListItem: {
    border: '1px solid #75e18c'
  }
});

const DraggableListItem = ({ component: Component, item, itemId, index }: DraggableListItemProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={(itemId+'')} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem:''}
        >
          <Component item={item}/>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
