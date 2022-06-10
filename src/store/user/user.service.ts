import { IUser } from "./user-interface";

export const getFullName = (user: any)=> {
  if (user?.firstName && user?.lastName) {
    return `${user?.firstName} ${user?.lastName}`
  } else {
    return user?.username;
  }
}