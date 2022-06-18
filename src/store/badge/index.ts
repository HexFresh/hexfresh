import { isEmpty } from "lodash";
import axiosClient from "../../api/axiosClient";
import { IRootDispatch, IRootStore } from "../store";

export const badgeStore: any = {
  state:{
    badges: null,
    isFetchingBadges: false,
    selectedUserBadges: [],
  },
  reducers:{
    setBadges: (state: IRootStore, payload: any)=>({...state, badges: payload}),
    setSelectedUserBadges: (state: IRootStore, payload: any)=>({...state, selectedUserBadges: payload}),
    setIsFetchingBadges: (state:IRootStore, payload:any)=>({...state, isFetchingBadges: payload}),
  },
  effects:(dispatch: IRootDispatch)=>({
       async doFetchBadges(keyword?: string, limit?: number,offset?: number ){
         const endpoint = 'badge/user';
         dispatch.badge.setIsFetchingBadges(true);
         try {
           const response = await axiosClient.get(endpoint);
           dispatch.badge.setBadges(response.data);
           dispatch.badge.setIsFetchingBadges(false);

         } catch (error) {
          dispatch.badge.setIsFetchingBadges(false);
           throw new Error(error);
         }
       },

      async doFetchUserBadge(userId: string){
        if(isEmpty(userId)) throw new Error('User must not be empty');

        const endpoint = `badge/user/${userId}`;
         dispatch.badge.setIsFetchingBadges(true);
         try {
           const response = await axiosClient.get(endpoint);
           dispatch.badge.setSelectedUserBadges(response.data);
           dispatch.badge.setIsFetchingBadges(false);

         } catch (error) {
          dispatch.badge.setIsFetchingBadges(false);
           throw new Error(error);
         }
      }
  })
}