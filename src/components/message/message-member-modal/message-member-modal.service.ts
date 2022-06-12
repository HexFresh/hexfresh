import { filter, includes } from "lodash";
import { IUser } from "../../../store/user/user-interface";

export const getRecipients = (recipients: string[], profiles: IUser[]) => {
  return filter(profiles, profile => (includes(recipients, profile.userId)));
}


