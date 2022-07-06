import { USER_PROFILE_TABS } from "../../constant";
import { IRootDispatch, IRootStore } from "../store";

export const appInitialState={
  selectedUserTab: USER_PROFILE_TABS.OVERVIEW,

}

export const appStore: any = {
  state:{
    ...appInitialState,
  },
  reducers:{
    setSelectedUserTab: (state: IRootStore, payload: number)=>({...state, selectedUserTab: payload}),
  },
}