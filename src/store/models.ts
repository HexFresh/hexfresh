// @filename: models.ts
import { user } from "./user/user-store"
import {locationStore} from "./location/location-store"
import {messageStore} from "./message/index";
import { Models } from "@rematch/core"
import { programStore } from "./planet/program-store"
import { notificationStore } from "./notification";
import { badgeStore } from "./badge";

export interface RootModel extends Models<RootModel> {
  user: typeof user,
  programStore: typeof programStore,
  location: typeof locationStore,
  message: typeof messageStore,
  notification: typeof notificationStore,
  badge: typeof badgeStore,
}
 
export const models:RootModel = {
  user, programStore,
  location: locationStore,
  message: messageStore,
  notification:notificationStore,
  badge: badgeStore,
}
