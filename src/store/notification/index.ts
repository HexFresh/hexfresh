import { notification } from "antd";
import { isEmpty } from "lodash";
import axiosMessage from "../../api/axiosMessage";
import { DEFAULT_PAGE_SIZE, INT_ONE, INT_ZERO } from "../../constant";
import rootStore, { IRootDispatch, IRootStore } from "../store"
import { ICounter, INotification } from "./notification.interface";

export const notificationInitialState = {
  notifications: [],
  selectedNotif: null,
  counter: {} as ICounter,

  isFetchingNotifications: false,
  isFetchingNotifDetail: false,
}

export const notificationStore: any = {
  state: {
    ...notificationInitialState,
  },
  reducers: {
    setNotifications: (state: IRootStore, payload: any) => ({ ...state, notifications: payload }),
    setSelectedNotification: (state: IRootStore, payload: any) => ({ ...state, selectedNotif: payload }),
    setIsFetchingNotifications: (state: IRootStore, payload: any) => ({ ...state, isFetchingNotifications: payload }),
    setIsFetchingNotifDetail: (state: IRootStore, payload: boolean) => ({ ...state, isFetchingNotifDetail: payload }),
    setCounter: (state: IRootStore, payload: any) => ({ ...state, counter: payload }),
  },
  effects: (dispatch: IRootDispatch) => ({
    doPushNotif(notificationPayload: INotification) {
      if (isEmpty(notification)) return;
      notification.info({
        message: `${notificationPayload.title}`,
        description: notificationPayload.body,
      });
    },

    async doFetchNotifications(page: number) {
      const endpoint = 'notification';

      const payload = { limit: DEFAULT_PAGE_SIZE, skip: page >= INT_ONE ? (page - 1) * DEFAULT_PAGE_SIZE : INT_ZERO };
      dispatch.notification.setIsFetchingNotifications(true);
      try {
        const response = await axiosMessage.get(endpoint, { params: payload });
        const notifications = rootStore.getState().notification.notifications;
        dispatch.notification.setNotifications([ ...notifications, ...response.data ]);
      } catch (error) {

      }
      dispatch.notification.setIsFetchingNotifications(false);
    },

    async doFetchNotificationDetail(notificationId: string) {
      const endpoint = `notification/${notificationId}`;
      dispatch.notification.setIsFetchingNotifDetail(true);

      try {
        const response = await axiosMessage.get(endpoint);

        dispatch.notification.setSelectedNotification(response.data);
        dispatch.notification.setIsFetchingNotifDetail(false);
      } catch (error) {
        dispatch.notification.setIsFetchingNotifDetail(false);
        throw new Error(error);
      }

    },

    async doFetchCounterNotification() {
      const endpoint = 'notification/counter';
      try {
        const response = await axiosMessage.get(endpoint);

        dispatch.notification.setCounter(response.data);
      } catch (error) {

      }
    }
  })
}

export type ILocationStore = typeof notificationStore;