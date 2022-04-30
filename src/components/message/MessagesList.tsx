import { Avatar, List, Skeleton } from "antd";
import { memo } from "react";

import './MessagesList.scss';

export const MessagesList = memo(({
  initLoading,
  loadMore,
  list,
  onClickItem,
}: {
  initLoading: boolean;
  loadMore: any;
  list: any[];
  onClickItem: any;
}) => {
  return <List
    className="demo-loadmore-list bg-white"
    loading={initLoading}
    itemLayout="horizontal"
    loadMore={loadMore}
    dataSource={list}
    style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
    renderItem={item => (
      <List.Item onClick={onClickItem } className='messages--item'>
        <Skeleton avatar title={false} loading={item.loading} active>
          <List.Item.Meta
            avatar={<Avatar src={item.picture.large} />}
            title={<a href="https://ant.design">{item.name.last}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <div>content</div>
        </Skeleton>
      </List.Item>
    )}
  />
});

MessagesList.displayName = 'MessagesList';
