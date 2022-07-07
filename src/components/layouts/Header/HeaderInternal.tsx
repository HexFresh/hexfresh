import { AssignmentInd, Logout } from '@mui/icons-material';
import { Avatar, Dropdown, Menu } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CustomAvatar } from '../../../core/component/avatar/avatar.component';
import { IRootDispatch, IRootStore } from '../../../store/store';
import './HeaderInternal.scss';

const HeaderInternal = ({ textColorClassName }: { textColorClassName?: string }) => {
  const dispatch = useDispatch<IRootDispatch>();
  const navigate = useNavigate();
  const myProfile = useSelector((state: IRootStore) => state.user.myProfile);

  const logoutHandler = React.useCallback(async () => {
    await dispatch.user.logoutHandlerAction({ dispatch, navigate });
  }, [ dispatch, navigate ]);

  useEffect(()=>{
    isEmpty(myProfile)&&dispatch.user.doFetchCurrentProfileInfo();
  },[dispatch.user, myProfile])

  const onClickMenu = ({ key }: { key: string }) => {
    switch (key) {
      case '1':
        navigate('/user/profile');
        break;
      case '2':
        logoutHandler();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={onClickMenu} className='menu-popup'>
      <Menu.Item key="1">
        <AssignmentInd className='mr-medium' />
        <span>
          My Profile
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <Logout className='mr-medium' />
        <span>
          Log Out
        </span>
      </Menu.Item>
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
       {/*  <div className="header-item">
          <Link className={textColorClassName} to="/">
            <span className="logo-item">
              <div className="logo-img">
                <img src="/document.png" alt="Onboarding icon" />
              </div>
              <span>Resources</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div> */}

        <div className="header-item">
          <Link className={textColorClassName} to="/notifications">
            <span className="logo-item">
              <div className="logo-img">
                <img src="https://res.cloudinary.com/droruloek/image/upload/v1656257769/hexfresh/bell_rnlwil.png" alt="Onboarding icon" />
              </div>
              <span>Notifications</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Link className={textColorClassName} to="/messages">
            <span className="logo-item">
              <div className="logo-img">
                <img src="https://res.cloudinary.com/droruloek/image/upload/v1654316954/hexfresh/chat_kl9pdo.png" alt="Onboarding icon" />
              </div>
              <span>Message</span>
            </span>
          </Link>
        </div>
        <div className="item-space"></div>

        <div className="header-item">
          <Link className={textColorClassName} to="/badges">
            <span className="logo-item">
              <div className="logo-img">

                <img src="https://res.cloudinary.com/droruloek/image/upload/v1654317056/hexfresh/medal_exmzvb.png" alt='Onboarding icon' />
              </div>
              <span>Your badges</span>
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
            <div>
              {
                isEmpty(myProfile) ?
                  <Avatar src="/man.png" /> :
                  <CustomAvatar user={myProfile} className={textColorClassName} />
              }
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderInternal;
