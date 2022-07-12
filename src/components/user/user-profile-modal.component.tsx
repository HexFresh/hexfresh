import {  ProfileOutlined, StockOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import Modal from "antd/lib/modal/Modal";
import { find, isEmpty } from "lodash";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { USER_PROFILE_TABS } from "../../constant";
import { IRootStore } from "../../store/store";
import { BadgeList } from "../badges/badge-list/badge-list.component";
import { RocketLoading } from "../loading/rocket-loading.component";
import { EmptyResult } from "../results";
import { UserBanner } from "./tab/user-banner.component";
import { UserInformationTab } from "./user-information.component";

import './user-profile-modal.scss';

export const UserProfileModal = memo((
  {
    userId,
    onClose,
    doFetchUserBadge,
    isFetchingBadges,
    isOpen = false,
  }:
    {
      isOpen: boolean,
      onClose: any,
      doFetchUserBadge: any,
      isFetchingBadges: boolean,
      userId: string,
    }
) => {

  const userProfiles = useSelector((state: IRootStore) => state.user.users);
  const accountProfile = useSelector((state: IRootStore) => state.message.profileRecipients);
  const badges = useSelector((state: IRootStore) => state.badge.selectedUserBadges);

  const user = find(userProfiles, [ 'id', userId ]);
  const account = find(accountProfile, [ 'userId', userId ]);

  useEffect(() => {
    !isEmpty(userId) && doFetchUserBadge(userId);

  }, [doFetchUserBadge, userId]);
  
  return <Modal
    className="user-profile-modal"
    visible={isOpen}
    onCancel={onClose}
    centered
    footer={[
      <Button key="back" onClick={onClose}>
        Close
      </Button>,
    ]}
  >
    {isOpen && !isEmpty(userId) && <div className="user-profile__container">

      <div className="page-name">Your Profile</div>

      <UserBanner
        email={user?.email}
        firstName={account?.firstName}
        lastName={account?.lastName}
      />

      <div className="card-body">
        <Tabs defaultActiveKey={USER_PROFILE_TABS.INFORMATIONS}>
          <Tabs.TabPane
            tab={
              <span>
                <ProfileOutlined />
                Personal Information
              </span>
            }
            tabKey={USER_PROFILE_TABS.INFORMATIONS}
            key={USER_PROFILE_TABS.INFORMATIONS}
          >
            <UserInformationTab
              userAccount={user}
              userProfile={account}
              address={account?.address}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <StockOutlined />
                Badges
              </span>
            }
            tabKey={USER_PROFILE_TABS.BADGES}
            key={USER_PROFILE_TABS.BADGES}
          >
            <div className="card-body__container">
              {isEmpty(badges)&&!isFetchingBadges ?
                <EmptyResult message="Your badges will displayed here." /> :isFetchingBadges?<RocketLoading/> :
                <BadgeList badges={badges} count={1} page={1} />}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>}
  </Modal>
});

UserProfileModal.displayName = 'UserProfileModal';