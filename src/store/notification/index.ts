import { notification } from "antd";
import { isEmpty } from "lodash";
import { IRootDispatch, IRootStore } from "../store"
import { INotification } from "./notification.interface";

export const notificationStore: any = {
  state: {
    notification: null,
  },
  reducers: {
  },
  effects: (dispatch: IRootDispatch)=>({
    doPushNotif(notificationPayload:INotification){
      if(isEmpty(notification)) return;
      notification.open({
        message: `New message from ${notificationPayload.title}`,
        description: notificationPayload.body,
      });
    }
  })
}

export type ILocationStore = typeof notificationStore;