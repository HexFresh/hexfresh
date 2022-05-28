import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Skeleton } from 'antd';

export const NotificationList = memo(({
  initLoading,
  loading,
  notifications,
}:{
  initLoading: boolean,
  loading: boolean,
  notifications: any[],
})=>{
  const loadMore =
  !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={()=>{}}>loading more</Button>
    </div>
  ) : null;
  return <List
  className="demo-loadmore-list"
  loading={initLoading}
  itemLayout="horizontal"
  loadMore={loadMore}
  dataSource={notifications}
  renderItem={item => (
    <List.Item
      actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
    >
      <Skeleton avatar title={false} loading={item.loading} active>
        <List.Item.Meta
          avatar={<Avatar src={item.picture.large} />}
          title={<a href="https://ant.design">{item.name.last}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </Skeleton>
    </List.Item>
  )}
/>;
});

NotificationList.displayName='NotificationList';