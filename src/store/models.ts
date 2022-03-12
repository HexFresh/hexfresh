// @filename: models.ts
import programStore from "./planet/program-store"
import { user } from "./user/user-store"
import {locationStore} from "./location/location-store"

export const models = { user, programStore, locationStore }
