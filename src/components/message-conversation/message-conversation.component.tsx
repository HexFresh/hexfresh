import { SendOutlined, MoreVert } from "@mui/icons-material";
import { Avatar, Input, Skeleton } from "antd";
import { memo, useCallback, useEffect, useState } from "react"
import _ from 'lodash';
import { io } from "socket.io-client";

import { socketInstance } from '../../utils/socketioInit';
import './message-conversation.scss';
import { IConversation } from "../../store/message/message-interface";
import { MessageContent } from "./message-content/message-content.component";
import { EmptyResult } from "../results";
import { IUser } from "../../store/user/user-interface";

export const MessageDetail = memo(({
  isLoading,
  conversation,
  profileRecipients,
}: {
  isLoading: boolean,
  conversation: IConversation,
  profileRecipients: IUser,
}) => {
  const [ messageString, setMessage ] = useState<string>('');
  const [ socket, setSocket ] = useState(io())
  const [ conversationId, setConversationId ] = useState('');

  const onChangeMessage = (event: any) => {
    const { value } = event.target;
    !_.isEmpty(value) && setMessage(value);
  };

  const onSendMessage = useCallback(() => {
    const messagePayload = {
      conversationId: '6277872e4559c2c50311f20d',
      data: messageString,
    };

    socket.emit(`send message`, messagePayload);
  }, [ messageString, socket ]);

  useEffect(() => {
    const newSocket = socketInstance;
    setSocket(newSocket);
  }, [])

  if (_.isEmpty(conversation)) { return <EmptyResult message="Your conversation will display here." /> }

  return isLoading ?
    <Skeleton avatar title={false} loading={isLoading} active /> :
    <section className="chat">
      <div className="header-chat">
        <Avatar size='large' >Y</Avatar>
        <p className="name">{conversation?.title}</p>
        <MoreVert className="right icon" style={{ cursor: 'pointer' }} />
      </div>
      <div className="messages-chat">
        {_.map(conversation?.messages, message => <MessageContent profileRecipients={profileRecipients} message={message?.message} />)}
      </div>
      <div className="footer-chat">
        <Input onChange={onChangeMessage} value={messageString} className="write-message" placeholder="Type your message here"></Input>
        <SendOutlined onClick={onSendMessage} color="primary" className="icon" style={{ cursor: 'pointer' }} />
      </div>
    </section>
});

MessageDetail.displayName = 'MessageDetail';