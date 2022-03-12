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
              name: 'What are the e wallets?',
              type: TaskCategory.MULTIPLE_CHOICES,
              taskStatus: TaskStatus.DOING,
              choices:[{
                choiceId: 'choice1',
                content: 'ZaloPay',
                //isRight: true,
              },
              {
                choiceId: 'choice2',
                content: 'Momo',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Shopee',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: 'Paypall',
                //isRight: true,
              }],
            },
            {
              id: 'tks3',
              name: 'What is the University of Science\'s main campus adderss?',
              type: TaskCategory.SINGLE_CHOICE,
              taskStatus: TaskStatus.TODO,
              choices:[{
                choiceId: 'choice1',
                content: '22 Nuyen Van Cu, D.5.',
                //isRight: false,
              },
              {
                choiceId: 'choice2',
                content: '227 Nguyen Van Cu Street, D.5',
                //isRight: true,
              },
              {
                choiceId: 'choice3',
                content: 'Linh Trung, Thu Duc City.',
                //isRight: false,
              },
              {
                choiceId: 'choice4',
                content: '546 Ngo Gia TU Street, D.5',
                //isRight: true,
              }],
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