import { find, isEmpty, isEqual } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { NotificationMessage, RecieiveMessage, ResponseMessage } from "./message-item.component";
import { IMessage } from "../../../store/message/message-interface";
import { MessageType } from "../../../store/message/message.constant";
import { IRootStore } from "../../../store/store";
import { IUser } from "../../../store/user/user-interface";

export const MessageContent = React.memo(({
  message,
  profileRecipients,

  doFetchRecipientsProfile
}: {
  message: IMessage,
  profileRecipients: IUser[],

  doFetchRecipientsProfile: any,
}) => {
  const userId = useSelector((state: IRootStore) => state.user?.id);
  const [ isResponseMessage, setIsResponseMessage ] = useState<boolean>(false);
  const [ avatar, setAvatar ] = useState<string>("");

  useEffect(() => {
    isEqual(userId, message?.from) && setIsResponseMessage(true);
    const user = find(profileRecipients, [ 'userId', message?.from ]) as unknown as IUser;

    !isEmpty(user) && setAvatar(user.avatar);

  }, [ message.from, profileRecipients, userId ])

  useEffect(() => {
    if (message?.type !== MessageType.CHAT) {
      message?.data && doFetchRecipientsProfile({ recipients: [ message.data ] })
    }
  }, [doFetchRecipientsProfile, message.data, message?.type])

  const renderMessage = useMemo(() => {
    switch (message?.type) {
      case MessageType.CHAT:
        return isResponseMessage ? <ResponseMessage message={message} /> : <RecieiveMessage message={message} avatar={avatar} />
      case MessageType.ADD_RECIPIENT:
        return <NotificationMessage message={message}/>;
      case MessageType.LEAVE:
        return <NotificationMessage message={message}/>;
      default:
        break;
    }
  }, [ avatar, isResponseMessage, message ])

  return <>
    {renderMessage}
  </>;
});

MessageContent.displayName = 'MessageContent';
