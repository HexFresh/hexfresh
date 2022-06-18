/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './mentor-profile.css';
import Sidebar from "../../components/side-bar/Sidebar";
import UserProfile from "../user-profile/UserProfile";


export default function MentorProfile() {
  return (
    <div className="mentor-profile">
      <div className="container">
        <Sidebar/>
        <div className="page-content">
          <UserProfile/>
        </div>
      </div>
    </div>
  );
}
