import { Avatar, Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IRootDispatch } from '../../../store/store';
import './HeaderInternal.scss';

const HeaderInternal = ({ textColorClassName }: { textColorClassName?: string }) => {
  const dispatch = useDispatch<IRootDispatch>();
  const navigate = useNavigate();

  const logoutHandler = React.useCallback(() => {
    dispatch.user.logoutHandlerAction({ dispatch, navigate });
  }, []);

  const onClickMenu = ({ key }: { key: string }) => {
    switch (key) {
      case '1':
        navigate('/user/profile');
        break;
      case '2':
        break;
      case '3':
        logoutHandler();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={onClickMenu}>
      <Menu.Item key="1">My Profile</Menu.Item>
      <Menu.Item key="2">My Todos</Menu.Item>
      <Menu.Item key="3">Sign out</Menu.Item>
    </Menu>
  );
  return (
    <div className="header-internal">
      <div className="header-content">
        <div className="header-item">
          <Link className={textColorClassName} to="/">
            <span className="logo-item">
              <div className="logo-img">
                <img src="/star.png" alt="Onboarding icon" />
              </div>
              <span>Onboarding</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>
        <div className="header-item">
          <Link className={textColorClassName} to="/">
            <span className="logo-item">
              <div className="logo-img">
                <img src="/document.png" alt="Onboarding icon" />
              </div>
              <span>Resources</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Link className={textColorClassName} to="/">
            <span className="logo-item">
              <div className="logo-img">
                <img src="/contact.png" alt="Onboarding icon" />
              </div>
              <span>Contacts</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Link className={textColorClassName} to="/">
            <span className="logo-item">
              <div className="logo-img">
                <img src="/more.png" alt="Onboarding icon" />
              </div>
              <span>More</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Link className={textColorClassName} to="/">
            <span className="logo-item">
              {/* <div className="logo-img">

                <img src="/star.png" alt='Onboarding icon' />
              </div> */}
              <span>11105 points</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Link className={textColorClassName} to="/leaderboard">
            <span className="logo-item">
              <div className="logo-img">
                <img src="/crown.png" alt="Onboarding icon" />
              </div>
              <span>Leaderboard</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Dropdown overlay={menu}>
            <Avatar src="/man.png" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderInternal;
