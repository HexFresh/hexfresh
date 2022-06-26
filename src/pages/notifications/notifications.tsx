import { Layout, Breadcrumb, Card } from "antd";
import { Content } from "antd/lib/layout/layout";
import { find, isEmpty, isEqual } from "lodash";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderInternal from "../../components/layouts/Header/HeaderInternal";
import { NotifcationModalDetail } from "../../components/notification/notification-detail/notification-detail.component";
import { NotificationList } from "../../components/notification/notification-list.component";
import { INotification } from "../../store/notification/notification.interface";
import { IRootDispatch, IRootStore } from "../../store/store";
import { IUser } from "../../store/user/user-interface";
import { NotificationType } from "../../utils/enum-utils";

const Notifications: FC<NotificationProps> = memo(({
  notifications,
  profileRecipients,
  counter,
  isFetchingNotifications,
  isFetchingNotifDetail,
  doFetchNotifications,
  doFetchProfile,
  doFetchCounterNotification,
  doFetchNotificationDetail,
}) => {
  const [ isActiveModal, setActiveModal ] = useState<boolean>(false);
  const [ selectedNotif, setSelectedNotif ] = useState<INotification>({} as INotification);
  const [ actionUser, setActionUser ] = useState<IUser>({} as IUser);

  const handleOpenNotifDetailModal = useCallback(
    (notif: INotification) => {
      //open modal
      setActiveModal(true);
      setSelectedNotif(notif);

    }, [])

  useEffect(() => {
    if (!isEqual(selectedNotif.type, NotificationType.SYSTEM)) {
      const user = find(profileRecipients, [ 'userId', selectedNotif.from ]);

      if (!isEmpty(user)) {
        setActionUser(user);
      } else {
        doFetchProfile({ recipients: selectedNotif.from })
      }
    }
  }, [ doFetchProfile, selectedNotif.from, selectedNotif.type ])

  useEffect(()=>{
    doFetchCounterNotification();
  },[])

  return <>
    <Layout className="full-height">
      {
        localStorage.getItem('roleId') === '4' ? <HeaderInternal textColorClassName='txt-color-black' /> : (<></>)
      }
      <Content className='centered' style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Notifications</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background ant-layout-has-sider"
          style={{ padding: '24px 0' }}
        >

          <Content style={{ padding: '0 24px', minHeight: 280, overflowY: 'scroll' }}>
            <Card className='message-detail'>
              <NotificationList
                loading={isFetchingNotifications}
                doFetchNotifications={doFetchNotifications}
                notifications={notifications}
                doFetchProfile={doFetchProfile}
                profileRecipients={profileRecipients}
                onSelectNotification={handleOpenNotifDetailModal}
                total={counter?.total} />
            </Card>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <NotifcationModalDetail
      isOpen={isActiveModal}
      onCancel={() => setActiveModal(false)}
      actionUser={actionUser}
      selectedNotif={selectedNotif}
    />
  </>

});

Notifications.displayName = 'Notifications';

const mapStateToProps = (state: IRootStore) => ({
  notifications: state.notification.notifications,
  isFetchingNotifications: state.notification.isFetchingNotifications,
  counter: state.notification.counter,
  isFetchingNotifDetail: state.notification.isFetchingNotifDetail,
  profileRecipients: state.message.profileRecipients,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doFetchNotifications: dispatch.notification.doFetchNotifications,
  doFetchProfile: dispatch.message.doFetchRecipientsProfile,
  doFetchNotificationDetail: dispatch.notification.doFetchNotificationDetail,
  doFetchCounterNotification: dispatch.notification.doFetchCounterNotification,
});

type NotificationStateProps = ReturnType<typeof mapStateToProps>;
type NotificationDispatchProps = ReturnType<typeof mapDispatchToProps>;

type NotificationProps = NotificationStateProps & NotificationDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);