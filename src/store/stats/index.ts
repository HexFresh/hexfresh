import axiosClient from "../../api/axiosClient";
import { IRootDispatch, IRootStore } from "../store";

export const statInitialState = {
  stats: {},
  isFetchingStats: false,
}

export const stats: any = {
  state: {
    ...statInitialState,
  },
  reducers: {
    setStats: (state: IRootStore, payload: any) => ({ ...state, stats: payload }),
    setIsFetchingStats: (state: IRootStore, payload: boolean) => ({ ...state, isFetchingStats: payload }),
  },
  effects: (dispatch: IRootDispatch) => ({
    async doFetchFresherStats() {
      const endpoint = 'stat/dashboard-fresher';
      dispatch.stats.setIsFetchingStats(true);
      try {
        const response = await axiosClient.get(endpoint);
        dispatch.stats.setStats(response.data);
      } catch (error) {
        console.log(error);
      }
      dispatch.stats.setIsFetchingStats(false);
    }
  })
}