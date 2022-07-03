import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { appInitialState } from "./app";
import { badgeInitialState } from "./badge";
import { locationInitialState } from "./location/location-store";
import { messageInitialState } from "./message";
import { models, RootModel } from "./models";
import { notificationInitialState } from "./notification";
import { programInititalState } from "./planet/program-store";
import { statInitialState } from "./stats";
import { userInitialState } from "./user/user-store";

const initialState ={
  user: userInitialState,
  programStore: programInititalState,
  location: locationInitialState,
  message: messageInitialState,
  notification: notificationInitialState,
  badge: badgeInitialState,
  app: appInitialState,
  stats: statInitialState,
}
const rootStore = init({
  models,
  plugins:[],
  redux:{
   rootReducers:{
    RESET_APP: (state, action) => initialState,
   }
  }
})
export default rootStore;

export type IStore = typeof rootStore;
export type IRootDispatch = RematchDispatch<RootModel>;
export type IRootStore = RematchRootState<RootModel>;
