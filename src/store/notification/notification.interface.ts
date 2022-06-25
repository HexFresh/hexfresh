import { networkInterfaces } from "os";

export interface INotification{
  body: string,
  createdAt: string,
  from: string,
  title: string,
  type:NotificationType,
  _id: string,
  recipients: string[],
}

export interface ICounter{
  seen: number,
  total: number,
  unseen: number,
}

export enum NotificationType{
  ANNOUNCEMENT= "announcement"
}