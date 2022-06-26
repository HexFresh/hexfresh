import { Button, Modal } from "antd";
import { isEqual } from "lodash";
import moment from "moment";
import { memo } from "react";
import { CustomAvatar } from "../../../core/component/avatar/avatar.component";
import { InlineValue } from "../../../core/component/inline-value";
import { INotification } from "../../../store/notification/notification.interface";
import { IUser } from "../../../store/user/user-interface";
import { NotificationType } from "../../../utils/enum-utils";

export const NotifcationModalDetail = memo(({
  selectedNotif,
  actionUser,
  onCancel,
  isOpen,
}: {
  selectedNotif: INotification,
  actionUser: IUser,
  onCancel: any,
  isOpen: boolean,
}) => {

  const fromUser = isEqual(selectedNotif.type, NotificationType.SYSTEM)? 
                      <CustomAvatar isSystem hasBackground/>:
                      <CustomAvatar user={actionUser} hasBackground/>
  return<Modal
  className="modal"
  title={selectedNotif?.title}
  visible={isOpen}
  onCancel={onCancel}
  footer={[ <Button key="back" onClick={onCancel}>
  Close
</Button>,]}
>
  <div className="detail-notification">
    <InlineValue title="From" value={fromUser}/>
    <InlineValue title="Time" value={<div>{`${moment(new Date(selectedNotif?.createdAt)).format('DD-MM-YYYY')}`}</div>}/>
    <InlineValue title="Content" value={selectedNotif?.body}/>
  </div>
</Modal>;
});

NotifcationModalDetail.displayName = 'NotifcationModalDetail'