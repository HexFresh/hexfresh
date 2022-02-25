import { createModel } from '@rematch/core'
import type { RootModel } from '../index'
 
export const user = createModel<RootModel>()({
	state: {
    userId: '',
    token:''
  },
	reducers: {
		
	},
	effects: (dispatch) => ({
	}),
})