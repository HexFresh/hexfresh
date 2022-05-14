import { Avatar, List, Skeleton } from "antd";
import _ from "lodash";
import { memo } from "react";
import { IConversation } from "../../store/message/message-interface";

import './MessagesList.scss';

export const MessagesList = memo(({
  initLoading,
  isLoading,
  loadMore,
  list,
  onClickItem,
  className,
  conversations,
}: {
  conversations: IConversation[],
  initLoading: boolean;
  isLoading: boolean;
  loadMore: any;
  list: any[];
  onClickItem: any;
  className?: string | undefined;
}) => {

  return isLoading ?
    <Skeleton avatar title={false} loading={isLoading} active /> :
    (!_.isEmpty(conversations) ? <List
      className={`${"demo-loadmore-list bg-white"} ${className}`}
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={conversations}
      style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
      renderItem={item => (
        <List.Item onClick={onClickItem.bind(null, item)} className='messages--item pv-medium'>
          <List.Item.Meta
            avatar={<Avatar src={''} />}
            title={<p >{item.title}</p>}
            description={item?.lastestMessage?.data}
          />
          <div>{(new Date(item.lastestMessage.createdAt)).toDateString()}</div>
          {/* </Skeleton> */}
        </List.Item>
      )}
    /> : <Skeleton avatar title={false} loading={isLoading} active />)
});

MessagesList.displayName = 'MessagesList';
