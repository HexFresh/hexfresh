// @filename: models.ts
import { user } from "./user/user-store"
import {locationStore} from "./location/location-store"
import { Models } from "@rematch/core"
import { programStore } from "./planet/program-store"

export interface RootModel extends Models<RootModel> {
  user: typeof user,
  programStore: typeof programStore,
  location: typeof locationStore,
}
 
export const models:RootModel = {
  user, programStore,
  location: locationStore
}
