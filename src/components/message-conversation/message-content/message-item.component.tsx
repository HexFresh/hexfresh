import { memo, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { find, isEmpty } from "lodash";
import moment from "moment";
import { Avatar } from "antd";

import { IMessage } from "../../../store/message/message-interface";
import { MessageType } from "../../../store/message/message.constant";
import { IRootStore } from "../../../store/store";
import { IUser } from "../../../store/user/user-interface";
import { getFullName } from "../../../store/user/user.service";

export const NotificationMessage = memo(({ message }: { message: IMessage}) => {
  const [profile, setProfile] = useState<IUser>();
  const profileRecipients = useSelector((state:IRootStore)=>(state.message.profileRecipients));

  useEffect(()=>{
    const user = find(profileRecipients, [ 'userId', message?.data ]);
    !isEmpty(user)&& setProfile(user);
  },[message.data,profileRecipients])

  const renderMessageContent = useMemo(()=>{
      if(message?.type===MessageType.ADD_RECIPIENT){
        const actionBy = find(profileRecipients, [ 'userId', message?.from ]);
        return `${getFullName(profile)} was added by ${getFullName(actionBy)}.`
      }else{
        return `${getFullName(profile)} was just leave to this conversation.`
      }
  },[message?.from, message?.type, profile, profileRecipients])

  return <div className="message-others">
    <div className="other">
      <p className="text">{renderMessageContent}</p>
      <p className="response-time time"> {`${moment(new Date(message?.createdAt)).fromNow()}`}</p>
    </div>
  </div>
});

NotificationMessage.displayName = 'NotificationMessage';

export const ResponseMessage = memo(({ message }: { message: IMessage }) => {
  return <div className="message text-only">
    <div className="response">
      <p className="text">{message.data}</p>
      <p className="response-time time"> {`${moment(new Date(message?.createdAt)).fromNow()}`}</p>
    </div>
  </div>
});

ResponseMessage.displayName='ResponseMessage';

export const RecieiveMessage = memo(({ message, avatar }: { message: IMessage, avatar: string }) => {
  return <div className="message">
  {!isEmpty(avatar) ? <div className="photo" style={{ backgroundImage: `url(${avatar})` }}>
    <div className="online"></div>
  </div> : <Avatar size='large' >U</Avatar>}
  <p className="text">{message?.data}</p>
  <p className="time"> {`${moment(new Date(message?.createdAt)).fromNow()}`}</p>
</div>
});

RecieiveMessage.displayName='RecieiveMessage'