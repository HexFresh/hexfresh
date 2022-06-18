import { AppleOutlined } from "@ant-design/icons";
import { AndroidOutlined } from "@mui/icons-material";
import { Tabs } from "antd";
import badge from "antd/lib/badge";
import Modal from "antd/lib/modal/Modal";
import { isEmpty } from "lodash";
import { memo } from "react";
import { USER_PROFILE_TABS } from "../../constant";
import { BadgeList } from "../badges/badge-list/badge-list.component";
import { EmptyResult } from "../results";

export const UserProfileModal = memo((
  {
    onSubmit,
    onCancel,
    userId,
    isOpen = false,
  }:
    {
      onSubmit: any,
      onCancel: any,
      isOpen: boolean,
      userId: string,
    }) => {
  return <Modal
    visible={isOpen}>
    {isOpen && <div className="user-profile__container">

      <div className="page-name">Your Profile</div>


      <div className="card-body">
        <Tabs defaultActiveKey={USER_PROFILE_TABS.INFORMATIONS}>
          <Tabs.TabPane
            tab={
              <span>
                <AppleOutlined />
                Persional Information
              </span>
            }
            tabKey={USER_PROFILE_TABS.INFORMATIONS}
            key={USER_PROFILE_TABS.INFORMATIONS}
          >
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <AndroidOutlined />
                Badges
              </span>
            }
            tabKey={USER_PROFILE_TABS.BADGES}
            key={USER_PROFILE_TABS.BADGES}
          >
            <div className="card-body__container">
             {/*  {isEmpty(badge?.badges) &&
                <EmptyResult message="Your badges will displayed here." /> :
              <BadgeList badges={badge?.badges} count={1} page={1} />} */}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>}
  </Modal>
});

UserProfileModal.displayName = 'UserProfileModal';