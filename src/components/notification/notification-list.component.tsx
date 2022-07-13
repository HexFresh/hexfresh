import moment from 'moment';
import { find, forEach, includes, isEmpty, isEqual } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { List, Skeleton, Divider, Typography, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'antd/dist/antd.css';

import { AVATAR_SYSTEM_SRC, INT_ONE } from '../../constant';
import { INotification } from '../../store/notification/notification.interface';
import { NotificationType } from '../../utils/enum-utils';
import { IUser } from '../../store/user/user-interface';

import './notification-list.style.scss';
import { RocketLoading } from '../loading/rocket-loading.component';

export const NotificationList = memo(({
  loading,
  notifications,
  profileRecipients,
  total,
  doFetchNotifications,
  doFetchProfile,
  onSelectNotification,
}: {
  loading: boolean,
  notifications: INotification[],
  profileRecipients: IUser[],
  total: number,
  doFetchNotifications: any,
  doFetchProfile: any,
  onSelectNotification: any,
}) => {
  const [ page, setPage ] = useState<number>(INT_ONE);

  const loadMore = useCallback(() => {
    if (loading) {
      return;
    }
    doFetchNotifications(page);
    setPage((prePage) => prePage + 1);
  }, [ doFetchNotifications, page ]);

  const handleSelectNotif = useCallback(
    (notif: INotification) => {
      onSelectNotification(notif);
    }, [ onSelectNotification ])

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const missingUserIds = [] as string[];

    forEach(
      notifications,
      notif => {
        // if (!isEqual(notif.from, NotificationType.SYSTEM)) {
        const user = find(profileRecipients, [ 'userId', notif.from ]);
        isEmpty(user) && !isEmpty(notif.from) && missingUserIds.push(notif.from);
        // }
      })

    doFetchProfile({ recipients: missingUserIds })
  }, [ doFetchProfile, notifications ])

  return <div
    id="scrollableDiv"
    style={{
      height: '100vh',
      overflow: 'auto',
      padding: '0 0',
      border: '1px solid rgba(140, 140, 140, 0.35)',
    }}
  >
    {loading ? <RocketLoading /> : <InfiniteScroll
      dataLength={notifications.length}
      next={loadMore}
      hasMore={notifications.length < total}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 1,
          }}
          active
        />
      }
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List className='notif-list'
        dataSource={notifications}
        renderItem={
          (item) => {
            const user = find(profileRecipients, [ 'userId', item.from ]);
            const avatarUser = (isEmpty(user) || isEmpty(user?.avatar)) ? <Avatar>{user?.username[ 0 ].toUpperCase()}</Avatar> : <Avatar src={user?.avatar} />;
            const notifAvatar = includes([ NotificationType.SYSTEM, NotificationType.BADGE ], item.type) ? <Avatar src={AVATAR_SYSTEM_SRC} /> : avatarUser;

            return <List.Item className='notif-item' key={item._id} onClick={handleSelectNotif.bind(null, item)}>
              <List.Item.Meta
                avatar={notifAvatar}
                title={<div >{item.title}</div>}
                description={<Typography.Text ellipsis={true} >{item.body}</Typography.Text>}
              />
              <div >{`${moment(new Date(item?.createdAt)).fromNow()}`}</div>
            </List.Item>
          }}
      />
    </InfiniteScroll>}
  </div>
});

NotificationList.displayName = 'NotificationList';