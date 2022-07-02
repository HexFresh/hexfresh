import { IRootStore } from "../store"

export const locationInitialState = {
  location: null,
}

export const locationStore: any = {
  state: {
    ...locationInitialState
  },
  reducers: {
    startAt: (state: IRootStore, payload: string) => ({ ...state, location: payload }),
    arrivedStartLocation: (state: IRootStore, payload: string) => ({ ...state, location: null }),
  }
}

export type ILocationStore = typeof locationStore;