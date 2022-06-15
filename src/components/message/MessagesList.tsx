import { memo } from "react";
import moment from "moment";
import { List, Skeleton, Typography } from "antd";
import _, { find, includes, isEmpty } from "lodash";
import { useSelector } from "react-redux";

import { IConversation, IMessage } from "../../store/message/message-interface";
import { MessageType } from "../../store/message/message.constant";
import { IRootStore } from "../../store/store";
import { IUser } from "../../store/user/user-interface";

import './MessagesList.scss';
import { getFullName } from "../../store/user/user.service";

export const MessagesList = memo(({
  initLoading,
  isLoading,
  loadMore,
  list,
  onClickItem,
  className,
  conversations,
  doFetchRecipientsProfile,
  profileRecipients,
}: {
  conversations: IConversation[],
  initLoading: boolean;
  isLoading: boolean;
  loadMore: any;
  list: any[];
  onClickItem: any;
  className?: string | undefined;
  doFetchRecipientsProfile: any;
  profileRecipients: IUser[];
}) => {

  const userId = useSelector((state: IRootStore) => state.user.id);

  const renderMessageContent = (message: IMessage) => {
    const user = find(profileRecipients, [ 'userId', message?.data ]);
    isEmpty(user) && message?.data && doFetchRecipientsProfile({ recipients: [ message?.data ] })
    switch (message?.type) {
      case MessageType.ADD_RECIPIENT:
        const actionBy = find(profileRecipients, [ 'userId', message?.from ]);
        isEmpty(actionBy) && message?.from && doFetchRecipientsProfile({ recipients: [ message?.from ] })
        return `${getFullName(user)} was added by ${getFullName(actionBy)}.`;
      case MessageType.LEAVE:
        return `${getFullName(user)} was just leave to this conversation.`;
      case MessageType.CREATE:
        return `${getFullName(user)} created this conversation.`;
      case MessageType.RENAME:
        return `${getFullName(user)} has rename this conversation.`;
      default:
        break;
    }
  };

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
        console.log("🚀 ~ file: MessagesList.tsx ~ line 70 ~ item.lastestMessage.type", item.lastestMessage.type)
        const content = isChatMessage ? item.lastestMessage.data : renderMessageContent(item.lastestMessage);
        console.log("🚀 ~ file: MessagesList.tsx ~ line 71 ~ isChatMessage", isChatMessage)
        const time = isEmpty(item.lastestMessage?.createdAt) ? new Date() : new Date(item.lastestMessage?.createdAt);
        console.log("🚀 ~ file: MessagesList.tsx ~ line 71 ~ content", content)

        return (
          <List.Item onClick={onClickItem.bind(null, item)} className={`messages--item pv-medium ${isUnreadMessage ? 'unread' : ''}`}>
            <List.Item.Meta
              title={<p >{item.title}</p>}
              description={<Typography.Text ellipsis={true} >{content}</Typography.Text>}
            />
            <div className="time">{`${moment(new Date(time)).fromNow()}`}</div>
            {/* </Skeleton> */}
          </List.Item>)
      }}
    /> : <Skeleton avatar title={false} loading={isLoading} active />)
});

MessagesList.displayName = 'MessagesList';
