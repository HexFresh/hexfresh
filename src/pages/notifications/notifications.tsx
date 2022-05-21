import { memo } from "react";
import { NotificationList } from "../../components/notification/notification-list.component";

export const Notifications = memo(()=>{
  return <NotificationList initLoading={false} loading={false} notifications={[]}/>
});

Notifications.displayName='Notifications';