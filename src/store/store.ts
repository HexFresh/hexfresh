import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "./models";

const rootStore = init({
  models,
  plugins:[]
})
export default rootStore;

export type IStore = typeof rootStore;
export type IRootDispatch = RematchDispatch<RootModel>;
export type IRootStore = RematchRootState<RootModel>;
