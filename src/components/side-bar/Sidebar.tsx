/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import './sidebar.css';
import {Link, useNavigate} from "react-router-dom";
import {Dropdown, Menu, Tooltip} from "antd";
import {School, Message} from "@mui/icons-material";
import {Avatar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {IRootDispatch, IRootStore} from "../../store/store";
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

export default function Sidebar() {
  const [active, setActive] = useState('');
  const dispatch = useDispatch<IRootDispatch>();
  const navigate = useNavigate();
  const myProfile = useSelector((state: IRootStore) => state.user.myProfile);

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
      <Menu.Item key="0" onClick={() => {
        navigate("/mentor/profile");
        setActive("profile");
        localStorage.setItem('sideBarTitle', 'profile');
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gridGap: '10px'
        }}><AssignmentIndIcon/>
          <div style={{fontWeight: "bold"}}>Profile</div>
        </div>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => logoutHandler()}>
        <div style={{
          display: 'flex', alignItems: 'center', gridGap: '10px'
        }}><LogoutIcon/>
          <div style={{fontWeight: "bold"}}>Log Out</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const renderName = () => {
    const name = localStorage.getItem('username');
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return 'G';
  }
  return (
    <div className="side-bar">
      <div className="menu">
        <div className="logo">
          <Link to="/mentor/programs">
            <img src="/logo.svg" width="40px" alt="logo"/>
          </Link>
        </div>

        <div className={active === "dashboard" ? "menu-item active" : "menu-item"}>
          <Tooltip color="#3751FF" title="Dashboard" placement="right">
            <Link className="link apps" to="/mentor/dashboard" onClick={() => {
              setActive("dashboard")
              localStorage.setItem('sideBarTitle', 'dashboard');
            }}>
              <DashboardIcon sx={{width: 36, height: 36}}/>
            </Link>
          </Tooltip>
        </div>

        <div className={active === "programs" ? "menu-item active" : "menu-item"}>
          <Tooltip color="#3751FF" title="Programs" placement="right">
            <Link className="link apps" to="/mentor/programs" onClick={() => {
              setActive("programs")
              localStorage.setItem('sideBarTitle', 'programs');
            }}>
              <LoyaltyIcon sx={{width: 36, height: 36}}/>
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


        <div className="bottom">
          <div className="avatar">
            <Dropdown arrow placement="topRight" overlay={menu}>
              <Avatar src={myProfile?.avatar}>
                {renderName()}
              </Avatar>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
