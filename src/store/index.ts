// @filename: models.ts
import { Models } from "@rematch/core"
import { user } from "./user/user-store"
 
export interface RootModel extends Models<RootModel> {
  user: typeof user
}
 
export const models: RootModel = { user }