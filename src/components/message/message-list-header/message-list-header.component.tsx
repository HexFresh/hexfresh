import { Avatar, Space, Typography} from "antd";
import React from "react";

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import './message-list-header.component.scss'

export const MessageListHeader = React.memo(({
   className = '',
   onAddChat, 
  }: { 
    className?: string | undefined;
    onAddChat: any; 
  }) => {
  return <div className="bg-white">
    <Space direction="horizontal" className={`${'message__list--header'} ${className}`}>
      <Typography style={{fontWeight: 500}} >Chat</Typography>
      <AddBoxOutlinedIcon className="pointer" onClick={onAddChat} />
    </Space>
  </div>;
});

MessageListHeader.displayName = 'MessageListHeader';