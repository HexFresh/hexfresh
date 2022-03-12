import { IRootStore } from "../store"

export const locationStore: any = {
  state: {
    location: null,
  },
  reducers: {
    startAt: (state: IRootStore, payload: string) => ({ ...state, location: payload }),
    arrivedStartLocation: (state: IRootStore, payload: string) => ({ ...state, location: null }),
  }
}

export type ILocationStore = typeof locationStore;