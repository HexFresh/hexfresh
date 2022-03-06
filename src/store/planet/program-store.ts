import { IPhase } from '../../interface/program-interface';
import { TaskCategory, TaskStatus } from '../../utilities/enum-utils';
import { IRootDispatch, IRootStore } from '../store';

interface IProgramStore {
  selectedProgram: IPhase;
}

const programStore: any = {
  state: {
    selectedProgram:
    {
      id: 'abcd',
      name: 'First onboarding',
      checklists: [
        {
          id: 'ck1',
          name: "Update your profile",
          tasks: [
            {
              id: 'tks1',
              name: 'Update your profile picture',
              type: TaskCategory.ASSIGNMENT,
              taskStatus: TaskStatus.DONE,
            },
            {
              id: 'tks2',
              name: 'Update your vaccination',
              type: TaskCategory.MULTIPLE_CHOICES,
              taskStatus: TaskStatus.DOING,
            },
            {
              id: 'tks3',
              name: 'Update your study status',
              type: TaskCategory.SINGLE_CHOICE,
              taskStatus: TaskStatus.TODO,
            }
          ]
        },
        {
          id: 'ck2',
          name: "Update your detail information",
          tasks: [
            {
              id: 'tks11',
              name: 'Upload your Household Booklet ',
              type: TaskCategory.ASSIGNMENT,
              taskStatus: TaskStatus.DONE,
            },
            {
              id: 'tks12',
              name: 'Upload your crime record',
              type: TaskCategory.MULTIPLE_CHOICES,
              taskStatus: TaskStatus.DOING,
            },
            {
              id: 'tks13',
              name: 'Provide your banking infor',
              type: TaskCategory.SINGLE_CHOICE,
              taskStatus: TaskStatus.TODO,
            }
          ]
        },
      ]
    },
  },
  reducers: {
    setSelectedProgram: (state: IProgramStore, payload: any) => ({ ...state, selectedProgram: payload }),
  },
  effects: (dispatch: IRootDispatch) => ({
    async doFetchProgram(payload: IPhase, rootStore: IRootStore) {
      console.log(payload,)
      dispatch.setSelectedProgram({});
    }
  }),

};

export default programStore;