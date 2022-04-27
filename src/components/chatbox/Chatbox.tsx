import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Widget } from 'react-chat-widget';

import io from 'socket.io-client';
import { socketInstance } from '../../utils/socketioInit';
import './Chatbox.css';

export type Message = {
  id: string;
  from: string;
  data: string;
  recipients: string[];
  createdAt: Date;
}

export default function Chatbox() {
  const [socket, setSocket] = useState(io())
  const [conversationId, setConversationId] = useState('');

  useEffect(() => {
    const newSocket = socketInstance;
    setSocket(newSocket);
  }, [])

  const handleNewUserMessage = () => {
    const input = document.getElementsByClassName('sender')[0] as any;
    input.message.value = '';
  }

  const handleSubmit = (e: any) => {
    const message = {
      conversationId: conversationId,
      data: e
    }

    if (!socket.connected) {
      console.log(localStorage.getItem('token'));
      socket.io.opts.query = "token=" + localStorage.getItem('token') as any;
      socket.connect();
    }
    console.log(conversationId)
    socket.emit("send message", message);
  }
  const handleChangeUser = (e: any) => {
    const value = e.target.value as string;
    setConversationId(value);
  }

  const chatTitleComponent = <TextField id="standard-basic" label="Input username" variant="standard" value={conversationId} onChange={handleChangeUser} />

  return (
    <Widget handleNewUserMessage={() => handleNewUserMessage} handleSubmit={handleSubmit}
      emojis={true} title={chatTitleComponent} subtitle=""
    >
    </Widget>
  )
}
