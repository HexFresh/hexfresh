import { SendOutlined, MoreVert } from "@mui/icons-material";
import { Avatar, Input } from "antd";
import { memo } from "react"

import './message-conversation.scss';

export const MessageDetail = memo(() => {
  return <section className="chat">
    <div className="header-chat">
      <Avatar size='large' >Y</Avatar>
      <p className="name">Megan Leib</p>
      <MoreVert className="right icon" style={{cursor: 'pointer'}}/>
    </div>
    <div className="messages-chat">
      <div className="message">
        <div className="photo" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)" }}>
          <div className="online"></div>
        </div>
        <p className="text"> Hi, how are you ? </p>
      </div>
      <div className="message text-only">
        <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
      </div>
      <p className="time"> 14h58</p>
      <div className="message text-only">
        <div className="response">
          <p className="text"> Hey Megan ! It's been a while 😃</p>
        </div>
      </div>
      <div className="message text-only">
        <div className="response">
          <p className="text"> When can we meet ?</p>
        </div>
      </div>
      <p className="response-time time"> 15h04</p>
      <div className="message">
        <div className="photo" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)" }}>
          <div className="online"></div>
        </div>
        <p className="text"> 9 pm at the bar if possible 😳</p>
      </div>
      <p className="time"> 15h09</p>
    </div>
    <div className="footer-chat">
      <Input className="write-message" placeholder="Type your message here"></Input>
      <SendOutlined color="primary" className="icon" style={{cursor: 'pointer'}} />
    </div>
  </section>
});

MessageDetail.displayName = 'MessageDetail';