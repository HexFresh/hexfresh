import { memo, useCallback, useEffect } from "react";
import moment from "moment";
import { List, Skeleton, Typography } from "antd";
import _, { find, forEach, includes, isEmpty } from "lodash";
import { useSelector } from "react-redux";

import { IConversation, IMessage } from "../../store/message/message-interface";
import { MessageType } from "../../store/message/message.constant";
import { IRootStore } from "../../store/store";
import { IUser } from "../../store/user/user-interface";

import './MessagesList.scss';
import { getFullName } from "../../store/user/user.service";

const ACTION_DATAUSER = [ MessageType.CREATE, MessageType.LEAVE ]

const ACTION_BOTHUSER = [ MessageType.ADD_RECIPIENT ];

const ACTION_FROMUSER = [ MessageType.CHAT, MessageType.RENAME ];

export const MessagesList = memo(({
  initLoading,
  isLoading,
  loadMore,
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
  onClickItem: any;
  className?: string | undefined;
  doFetchRecipientsProfile: any;
  profileRecipients: IUser[];
}) => {

  const userId = useSelector((state: IRootStore) => state.user.id);

  useEffect(() => {
    forEach(
      conversations,
      conversation => {
        const { lastestMessage } = conversation;
        if (lastestMessage.type === MessageType.CHAT) return;

        const user = find(profileRecipients, [ 'userId', lastestMessage?.data ]);

        const recipientIds = includes(ACTION_FROMUSER, lastestMessage.type) ?
          [ lastestMessage.from ] : includes(ACTION_DATAUSER, lastestMessage.type) ?
            [ lastestMessage.data ] : [ lastestMessage.from, lastestMessage.data ];
        isEmpty(user) && lastestMessage?.data && doFetchRecipientsProfile({ recipients: recipientIds })
      })
  }, [ conversations, doFetchRecipientsProfile ])

  const renderMessageContent = useCallback((message: IMessage) => {
    if (message.type === MessageType.CHAT) return;
    const user = find(profileRecipients, [ 'userId', message?.data ]);

    switch (message?.type) {
      case MessageType.ADD_RECIPIENT:
        const actionBy = find(profileRecipients, [ 'userId', message?.from ]);
        return `${getFullName(user)} was added by ${getFullName(actionBy)}.`;
      case MessageType.LEAVE:
        return `${getFullName(user)} was just leave to this conversation.`;
      case MessageType.CREATE:
        return `${getFullName(user)} created this conversation.`;
      case MessageType.RENAME:
        const renameBy = find(profileRecipients, [ 'userId', message?.from ]);
        return `${getFullName(renameBy)} has renamed this conversation.`;
      default:
        break;
    }
  }, [ doFetchRecipientsProfile, profileRecipients ]);

  return isLoading ?
    <Skeleton avatar title={false} loading={isLoading} active /> :
    (!_.isEmpty(conversations) ? <List
      className={`${"demo-loadmore-list bg-white"} ${className}`}
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={conversations}
      style={{/*  height: '100%', */ overflowY: 'auto', overflowX: 'hidden' }}
      renderItem={item => {
        const isUnreadMessage = !isEmpty(item.lastestMessage?.seen) && !includes(item.lastestMessage?.seen, userId);
        const isChatMessage = item.lastestMessage.type === MessageType.CHAT;
        const content = isChatMessage ? item.lastestMessage.data : renderMessageContent(item.lastestMessage);
        const time = isEmpty(item.lastestMessage?.createdAt) ? new Date() : new Date(item.lastestMessage?.createdAt);

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
