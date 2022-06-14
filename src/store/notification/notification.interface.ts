export interface INotification{
  body: string,
  createAt: string,
  from: string,
  title: string,
  type:NotificationType,
  _id: string,
  recipients: string[],
}

export enum NotificationType{
  ANNOUNCEMENT= "announcement"
}