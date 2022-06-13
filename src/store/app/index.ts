import { USER_PROFILE_TABS } from "../../constant";
import { IRootDispatch, IRootStore } from "../store";

export const appStore: any = {
  state:{
    selectedUserTab: USER_PROFILE_TABS.INFORMATIONS,
  },
  reducers:{
    setSelectedUserTab: (state: IRootStore, payload: number)=>({...state, selectedUserTab: payload}),
  },
}