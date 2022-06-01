import { Avatar } from "antd";
import { find, isEmpty, isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IMessage } from "../../../store/message/message-interface";
import { IRootStore } from "../../../store/store";
import { IUser } from "../../../store/user/user-interface";

export const MessageContent = React.memo(({
  message,
  profileRecipients,
}: {
  message: IMessage,
  profileRecipients: IUser[],
}) => {
  const userId = useSelector((state: IRootStore) => state.user?.id);
  const [ isResponseMessage, setIsResponseMessage ] = useState<boolean>(false);
  const [ avatar, setAvatar ] = useState<string>("");

  useEffect(() => {
    isEqual(userId, message?.from) && setIsResponseMessage(true);
    const user = find(profileRecipients, [ 'userId', message?.from ]) as unknown as IUser;

    !isEmpty(user) && setAvatar(user.avatar);

  }, [ message.from, profileRecipients, userId ])

  return <>
    {isResponseMessage ? <div className="message text-only">
      <div className="response">
        <p className="text">{message.data}</p>
        <p className="response-time time"> {new Date(message?.createdAt).toLocaleDateString()}</p>
      </div>
    </div> :
      <div className="message">
        {!isEmpty(avatar) ? <div className="photo" style={{ backgroundImage: `url(${avatar})` }}>
          <div className="online"></div>
        </div> : <Avatar size='large' >U</Avatar>}
        <p className="text">{message?.data}</p>
        <p className="time"> {new Date(message?.createdAt).toTimeString()}</p>
      </div>}
  </>;
});

MessageContent.displayName = 'MessageContent';
