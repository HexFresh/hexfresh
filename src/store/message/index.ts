import { notification } from "antd";
import _, { values } from "lodash";
import axiosClient from "../../api/axiosClient";
import axiosMessage from "../../api/axiosMessage";
import { INT_ZERO } from "../../constant";
import rootStore, { IRootDispatch, IRootStore } from "../store"
import { IUser } from "../user/user-interface";
import { IMessageDetail } from "./message-interface";

export const messageStore: any = {
  state: {
    selectedConversation: null,
    conversations: null,
    profileRecipients: [],
    isFetchingConversations: false,
    isFetchingConversation: false,
    isFetchingRecipients: false,
  },
  reducers: {
    setIsFetchingConversation: (state: IRootStore, payload: any) => ({ ...state, isFetchingConversation: payload }),
    setIsFetchingConversations: (state: IRootStore, payload: any) => ({ ...state, isFetchingConversations: payload }),
    setSelectedConversation: (state: IRootStore, payload: any) => ({ ...state, selectedConversation: payload }),
    setConversations: (state: IRootStore, payload: any) => ({ ...state, conversations: payload }),
    setuserProfiles: (state: IRootStore, payload: any) => ({ ...state, profileRecipients: payload }),
    setIsFetchingRecipients: (state: IRootStore, payload: any) => ({ ...state, isFetchingRecipients: payload }),
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

    async doFetchConversation({ conversationId, skip, limit }: { conversationId: number, skip: number, limit: number }) {
      const endpoint = `conversation/${conversationId}`;

      try {
        dispatch.message.setIsFetchingConversation(true);
        const response = await axiosMessage.get(endpoint);

        dispatch.message.setSelectedConversation(response.data);
        dispatch.message.setIsFetchingConversation(false);

      } catch (error) {
        dispatch.message.setIsFetchingConversation(false);

      }
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
      dispatch.message.setuserProfiles([]);

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
          dispatch.message.setuserProfiles(recipients);
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

      //update latedt message in conversations
      const conversationIndex = _.findIndex(conversations, { _id: conversationId });
      const updatedConversations = [ ...conversations ];
      if (conversationIndex >= INT_ZERO) {
        const updatedLastestMessage = { ...conversations[ conversationIndex ], lastestMessage: message }
        updatedConversations[ conversationIndex ] = updatedLastestMessage;

        dispatch.message.setConversations(updatedConversations);
      }
      //update message for selected Conversation.
      if (_.isEqual(conversationId, selectedConversation?._id)) {
        const messages = selectedConversation?.messages;
        messages.unshift(messagePayload);
        const updatedSelectedConversation = {
          ...selectedConversation,
          lastestMessage: message,
          messages
        };
        dispatch.message.setSelectedConversation(updatedSelectedConversation);
      }
    }

  })
}

export type ILocationStore = typeof messageStore;