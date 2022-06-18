/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import './sidebar.css';
import {Link, useNavigate} from "react-router-dom";
import {Dropdown, Menu, Tooltip} from "antd";
import {Apps, Folder, School, Settings, Message, AccountCircle} from "@mui/icons-material";
import {Avatar} from "@mui/material";
import {useDispatch} from "react-redux";
import {IRootDispatch} from "../../store/store";

export default function Sidebar() {
  const [active, setActive] = useState('');
  const dispatch = useDispatch<IRootDispatch>();
  const navigate = useNavigate();

  const logoutHandler = React.useCallback(() => {
    dispatch.user.logoutHandlerAction({dispatch, navigate});
  }, []);


  useEffect(() => {
    const sideBarTitle = localStorage.getItem('sideBarTitle');
    if (sideBarTitle) {
      setActive(sideBarTitle);
    } else {
      setActive('programs');
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => logoutHandler()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="side-bar">
      <div className="menu">
        <div className="logo">
          <Link to="/mentor/programs">
            <img src="/logo.svg" width="40px" alt="logo"/>
          </Link>
        </div>
        <div className={active === "programs" ? "menu-item active" : "menu-item"}>
          <Tooltip color="#3751FF" title="Programs" placement="right">
            <Link className="link apps" to="/mentor/programs" onClick={() => {
              setActive("programs")
              localStorage.setItem('sideBarTitle', 'programs');
            }}>
              <Apps sx={{width: 40, height: 40}}/>
            </Link>
          </Tooltip>
        </div>
        <div className={active === "freshers" ? "menu-item active" : "menu-item"}>
          <Tooltip color="#3751FF" title="Freshers" placement="right">
            <Link className="link apps" to="/mentor/freshers" onClick={() => {
              setActive("freshers")
              localStorage.setItem('sideBarTitle', 'freshers');
            }}>
              <School sx={{width: 40, height: 40}}/>
            </Link>
          </Tooltip>
        </div>
        <div className={active === "messages" ? "menu-item active" : "menu-item"}>
          <Tooltip color="#3751FF" title="Messages" placement="right">
            <Link className="link apps" to="/mentor/message" onClick={() => {
              setActive("messages")
              localStorage.setItem('sideBarTitle', 'messages');
            }}>
              <Message sx={{width: 36, height: 36}}/>
            </Link>
          </Tooltip>
        </div>

        <div className={active === "profile" ? "menu-item active" : "menu-item"}>
          <Tooltip color="#3751FF" title="Profile" placement="right">
            <Link className="link apps" to="/mentor/profile" onClick={() => {
              setActive("profile")
              localStorage.setItem('sideBarTitle', 'profile');
            }}>
              <AccountCircle sx={{width: 36, height: 36}}/>
            </Link>
          </Tooltip>
        </div>


        <div className="bottom">
          <div className="folder">
            <Tooltip color="#3751FF" title="Resources" placement="right">
              <Folder sx={{width: 30, height: 30}}/>
            </Tooltip>
          </div>
          <div className="settings">
            <Tooltip color="#3751FF" title="Settings" placement="right">
              <Settings sx={{width: 30, height: 30}}/>
            </Tooltip>
          </div>
          <div className="avatar">
            <Dropdown arrow placement="topRight" overlay={menu}>
              <Avatar/>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
