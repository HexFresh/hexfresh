import React from 'react';
import './mentor-message.css';
import Sidebar from "../../components/side-bar/Sidebar";
import Messages from "../messages/messages";


export default function MentorMessage() {
  return (
    <div className="mentor-message">
      <div className="container">
        <Sidebar/>
        <div className="page-content">
          <Messages/>
        </div>
      </div>
    </div>
  );
}
