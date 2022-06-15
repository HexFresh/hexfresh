import { MessageOutlined } from "@ant-design/icons";
import { style } from "@mui/system";
import { notification } from "antd";
import _, { find, isEmpty, isEqual, uniqueId} from "lodash";
import axiosClient from "../../api/axiosClient";
import axiosMessage from "../../api/axiosMessage";
import { INT_ZERO } from "../../constant";
import rootStore, { IRootDispatch, IRootStore } from "../store"
import { IUser } from "../user/user-interface";
import { IMessageDetail } from "./message-interface";
import { MessageType } from "./message.constant";

export const messageStore: any = {
  state: {
    selectedConversation: null,
    conversations: null,
    profileRecipients: [],
    counter: null,

    isFetchingConversations: false,
    isFetchingConversation: false,
    isFetchingRecipients: false,
    isAddingMember: false,
    isLeavingConversation: false,
    forceScrollDown: '',
  },
  reducers: {
    setIsFetchingConversation: (state: IRootStore, payload: any) => ({ ...state, isFetchingConversation: payload }),
    setIsFetchingConversations: (state: IRootStore, payload: any) => ({ ...state, isFetchingConversations: payload }),
    setSelectedConversation: (state: IRootStore, payload: any) => ({ ...state, selectedConversation: payload }),
    setConversations: (state: IRootStore, payload: any) => ({ ...state, conversations: payload }),
    setuserProfiles: (state: IRootStore, payload: any) => ({ ...state, profileRecipients: payload }),
    setCounter: (state: IRootStore, payload: any) => ({ ...state, counter: payload }),

    setIsFetchingRecipients: (state: IRootStore, payload: any) => ({ ...state, isFetchingRecipients: payload }),
    setIsAddingMember: (state: IRootStore, payload: any) => ({ ...state, isAddingMember: payload }),
    setIsLeavingConversation: (state: IRootStore, payload: any) => ({ ...state, isLeavingConversation: payload }),
    setForceScrollDown: (state: IRootStore, payload: any) => ({...state, forceScrollDown: payload}),
  },
  effects: (dispatch: IRootDispatch) => ({
    async doCreateConversation({ recipients, title }: { recipients: string[], title: string }) {
      const endpoint = 'conversation';

      dispatch.message.setIsFetchingConversations(true);
      try {
        await axiosMessage.post(endpoint, { recipients, title });

        notification.success({
          message: 'Created successfully.',
          description: `${title} is created.`
        });
        dispatch.message.setIsFetchingConversations(false);

      } catch (error) {
        notification.error({
          message: 'Failed to create conversation.',
          description: error,
        });
        dispatch.message.setIsFetchingConversations(false);
      }
    },

    async doFetchAllConversation() {
      const endpoint = 'conversation';
      dispatch.message.setIsFetchingConversations(true);
      try {
        const response = await axiosMessage.get(endpoint);
        dispatch.message.setConversations(response.data);
        dispatch.message.setIsFetchingConversations(false);
      } catch (error) {
        dispatch.message.setIsFetchingConversations(false);
      }
    },

    async doFetchConversation({ conversationId, skip, limit }: { conversationId: string, skip: number, limit: number }) {
      const endpoint = `conversation/${conversationId}`;
      try {
        dispatch.message.setIsFetchingConversation(true);
        const response = await axiosMessage.get(endpoint);

        dispatch.message.setSelectedConversation(response.data);
        dispatch.message.setIsFetchingConversation(false);

      } catch (error) {
        dispatch.message.setIsFetchingConversation(false);
      }
      this.doReadMessage(conversationId);
    },

    async doRenameConversation({ conversationId, payload }: { conversationId: number, payload: { title: string } }) {
      const endpoint = `conversation/${conversationId}/title`;
      try {

        await axiosMessage.put(endpoint, payload);

        const selectedConversation = rootStore.getState().message.selectedConversation;
        const updatedConversation = { ...selectedConversation, title: payload.title };
        dispatch.message.setSelectedConversation(updatedConversation);

        const conversations = rootStore.getState().message.conversations;
        const indexConversation = _.findIndex(conversations, { _id: conversationId });
        const conversation = conversations[ indexConversation ];
        const updatedConversations = [ ...conversations ];
        updatedConversations[ indexConversation ] = { ...conversation, title: payload.title };
        dispatch.message.setConversations(updatedConversations);

        notification.success({
          message: 'Update title successfully.',
          description: `Your title ${payload.title} is updated.`
        });
      } catch (error) {
        notification.error({
          message: 'Failed to update conversation title.',
          description: error,
        });
      }

    },
    async doFetchRecipientsProfile({ recipients }: { recipients: string[] }) {

      dispatch.message.setIsFetchingRecipients(true);

      try {
        const promises = _.map(recipients,
          async recipient => {

            const endpoint = `user/${recipient}/user-profile`;

            return await axiosClient.get(endpoint)
          }
        );

        Promise.allSettled(promises).then(values => {
          const recipients = _.map(values, (result) => {
            if (result.status === 'fulfilled') {
              return result.value.data;
            }
            if (result.status === 'rejected') {
              return {} as IUser;
            }
          });
          const profileRecipients = _.cloneDeep(rootStore.getState().message.profileRecipients);

          _.forEach(recipients, user => {
            const foundIndex = _.findIndex(profileRecipients, [ 'userId', user?.userId ])
            if (foundIndex < 0) {
              !isEmpty(user) && profileRecipients.unshift(user);
            } else {
              profileRecipients[ foundIndex ] = user;
            }
          })
          dispatch.message.setuserProfiles(profileRecipients);
        });
        dispatch.message.setIsFetchingRecipients(false);

      } catch (error) {
        dispatch.message.setIsFetchingRecipients(false);

        throw new Error(error);
      }
    },

    async doRecieveMessage({ messagePayload }: { messagePayload: IMessageDetail }) {
      const { _id, conversationId, message } = messagePayload;

      const conversations = rootStore.getState().message.conversations;
      const selectedConversation = rootStore.getState().message.selectedConversation;

      const isSelectedConversation = _.isEqual(conversationId, selectedConversation?._id);
      //update message for selected Conversation.
      if (isSelectedConversation) {
        const messages = selectedConversation?.messages;
        const { data, type } = message;

        messages.unshift(messagePayload);
        let updatedSelectedConversation = {
          ...selectedConversation,
          lastestMessage: message,
          messages
        };

        if (isEqual(type, MessageType.LEAVE)) {

          const recipients = selectedConversation?.recipients;
          const newRecipients = _.filter(recipients, item => item !== data);
          updatedSelectedConversation = { ...updatedSelectedConversation, recipients: newRecipients };
        }

        dispatch.message.setSelectedConversation(updatedSelectedConversation);
      }

      //update latedt message in conversations
      const conversationIndex = _.findIndex(conversations, { _id: conversationId });
      const updatedConversations = [ ...conversations ];
      if (conversationIndex >= INT_ZERO) {
        const updatedLastestMessage = isSelectedConversation ?
          { ...conversations[ conversationIndex ], lastestMessage: { ...message } } :
          { ...conversations[ conversationIndex ], lastestMessage: { ...message, seen: [ message.from ] } };
        updatedConversations[ conversationIndex ] = updatedLastestMessage;

        const { data, type } = message;
        if (isEqual(type, MessageType.LEAVE)) {
          const recipientIds = conversations[ conversationIndex ].recipients;
          const newRecipients = _.filter(recipientIds, item => item !== data);
          const updatedRecipients = { ...conversations[ conversationIndex ], recipients: newRecipients };
          updatedConversations[ conversationIndex ] = updatedRecipients;
        }

        dispatch.message.setConversations(updatedConversations);
      }
      dispatch.message.setForceScrollDown(uniqueId('message_'));
    },

    async doAddMember({ recipientIds, conversationId }: { recipientIds: string[], conversationId: string }) {
      const endpoint = `conversation/${conversationId}/recipient`;
      dispatch.message.setIsAddingMember(true);
      try {
        await axiosMessage.put(endpoint, { recipient: recipientIds[ INT_ZERO ] });
        dispatch.message.setIsAddingMember(false);

        //update recipients fo selected conversation.
        const selectedConversation = _.cloneDeep(rootStore.getState().message.selectedConversation);
        const recipients = selectedConversation.recipients;
        const updatedRecipients = [ ...recipients, recipientIds[ INT_ZERO ] ];
        const updatedSelectedConversation = { ...selectedConversation, recipients: updatedRecipients };

        dispatch.message.setSelectedConversation(updatedSelectedConversation);

        //add user to conversation list
        const conversations = rootStore.getState().message.conversations;
        const conversationIndex = _.findIndex(conversations, { _id: conversationId });
        const updatedConversations = [ ...conversations ];

        if (conversationIndex >= INT_ZERO) {
          const updatedConversation = { ...conversations[ conversationIndex ], recipients: updatedRecipients }
          updatedConversations[ conversationIndex ] = updatedConversation;

          dispatch.message.setConversations(updatedConversations);
        }

        //notif
        notification.success({
          message: 'Add user to conversation successfully.',
          description: `User can join the conversation from now.`
        });
      } catch (error) {
        dispatch.message.setIsAddingMember(false);
        notification.error({
          message: 'Failed to add new member to conversation.',
          description: error,
        });
        throw new Error(error);
      }
    },

    async doLeaveConversation({ conversationId }: { conversationId: string }) {
      const endpoint = `conversation/${conversationId}/leave`;
      dispatch.message.setIsLeavingConversation(true);
      try {
        await axiosMessage.put(endpoint);
        notification.success({
          message: 'Leave successfully.',
          description: `You can not see any more message from this comversation`
        });
        //update conversations.
        const conversations = rootStore.getState().message.conversations;
        const updatedConversations = _.filter(conversations, conversation => conversation._id !== conversationId);
        dispatch.message.setConversations(updatedConversations);
        //update selectedConversation
        dispatch.message.setSelectedConversation({});
        dispatch.message.setIsLeavingConversation(false);

      } catch (error) {
        notification.error({
          message: 'Failed to leave this conversation.',
          description: error,
        });
        dispatch.message.setIsLeavingConversation(false);

        throw new Error(error);
      }
    },

    async doFetchAmountUnreadMessages({ conversationId }: { conversationId: string }) {
      const endpoint = `conversation/counter`;

      try {
        const response = await axiosMessage.get(endpoint);
        dispatch.message.setCounter(response?.data);
      } catch (error) {

        throw new Error(error);
      }
    },

    doPushNotificationMessage(messagePayload: IMessageDetail) {
      if (isEmpty(messagePayload)) return;
      const profileRecipients = rootStore.getState().message.profileRecipients;
      notification.open({
        message: `New message from ${messagePayload.conversationId}`,
        description: messagePayload.message.data,
        icon: MessageOutlined,
      });
    },

    doReadMessage(conversationId: string) {
      const conversations = rootStore.getState().message.conversations;
      const userId = rootStore.getState().user.id;
      const conversationIndex = _.findIndex(conversations, { _id: conversationId });
      const updatedConversations = [ ...conversations ];
      if (conversationIndex >= INT_ZERO) {
        const selectedConversation = conversations[ conversationIndex ];
        const updatedLastestMessage = { ...selectedConversation.lastestMessage, seen: [ ...selectedConversation?.lastestMessage?.seen, userId ] }
        const updatedConversation = { ...selectedConversation, lastestMessage: updatedLastestMessage };
        updatedConversations[ conversationIndex ] = updatedConversation;

        dispatch.message.setConversations(updatedConversations);
      }
    },

  })
}

export type ILocationStore = typeof messageStore;