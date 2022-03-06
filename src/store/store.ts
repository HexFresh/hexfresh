import { init, RematchRootState } from "@rematch/core";
import { models } from "./models";

const rootStore = init({
  models,
  plugins:[]
})
export default rootStore;

export type IStore = typeof rootStore;
export type IRootDispatch = typeof rootStore.dispatch;
export type IRootStore = RematchRootState<typeof models>;

export var dispatch: IRootDispatch;
export var state: IRootStore;
