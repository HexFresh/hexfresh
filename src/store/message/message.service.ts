import { findLast, isEmpty } from "lodash";
import { IMessageDetail } from "./message-interface";
import { MessageType } from "./message.constant";

export const getLastChatMessage = (messages: IMessageDetail[]) => {
  const lastMessage = findLast(messages, message => message.message.type === MessageType.CHAT);
  return !isEmpty(lastMessage) ? lastMessage?.message.data : '...';
}