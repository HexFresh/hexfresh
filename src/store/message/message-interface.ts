export interface IConversation{
  _id: string;
  recipients: string [],
  title: string,
  updateAt: string,
  lastestMessage:IMessage,
  messages: IMessageDetail[],
}

export interface IMessage{
  data: string,
  from: string,
  createdAt: string,
  type: string,
  seen?: string[],
}

export interface IMessageDetail{
  _id: string,
  conversationId: string,
  message:IMessage,
}