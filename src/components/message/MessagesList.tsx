import { List, Skeleton, Typography } from "antd";
import _, { includes, isEmpty } from "lodash";
import moment from "moment";
import { memo } from "react";
import { useSelector } from "react-redux";
import { IConversation } from "../../store/message/message-interface";
import { MessageType } from "../../store/message/message.constant";
import { getLastChatMessage } from "../../store/message/message.service";
import { IRootStore } from "../../store/store";

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

  const userId = useSelector((state: IRootStore) => state.user.id);

  return isLoading ?
    <Skeleton avatar title={false} loading={isLoading} active /> :
    (!_.isEmpty(conversations) ? <List
      className={`${"demo-loadmore-list bg-white"} ${className}`}
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={conversations}
      style={{/*  height: '100%', */ overflowY: 'auto', overflowX: 'hidden' }}
      renderItem={item => {
        const isUnreadMessage = !isEmpty(item.lastestMessage?.seen) && !includes(item.lastestMessage?.seen, userId);
        const isChatMessage = item.lastestMessage.type === MessageType.CHAT;
        const content = isChatMessage ? item?.lastestMessage?.data : getLastChatMessage(item.messages);
        return (
          <List.Item onClick={onClickItem.bind(null, item)} className={`messages--item pv-medium ${isUnreadMessage ? 'unread' : ''}`}>
            <List.Item.Meta
              title={<p >{item.title}</p>}
              description={<Typography.Text ellipsis={true} >{content}</Typography.Text>}
            />
            <div className="time">{`${moment(new Date(item.lastestMessage.createdAt)).fromNow()}`}</div>
            {/* </Skeleton> */}
          </List.Item>)
      }}
    /> : <Skeleton avatar title={false} loading={isLoading} active />)
});

MessagesList.displayName = 'MessagesList';
