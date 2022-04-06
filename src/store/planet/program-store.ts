import { createModel } from '@rematch/core';
import _ from 'lodash';
import axiosClient from '../../api/axiosClient';
import { ICheckList, IImage, IPhase, ITask } from '../../interface/program-interface';
import rootStore, { IRootDispatch, IRootStore } from '../store';

type IProgramStore = {
  selectedPhase: IPhase;
  programs: IPhase;
  checklists: ICheckList[];
  selectedTask: ITask;
  imageList: IImage[];
  isFetchingProgram: boolean;
  isFetchingPhase: boolean;
  isFetchingTask: boolean;
  isFetchingChecklist: boolean;
  isFetchAnswer: boolean;
}


export const programStore: any = createModel<IRootStore>()({
  state: {
    program: {},
    selectedPhase: {},
    checklists: [],
    selectedTask: {},
    imageList: [],
    isFetchingProgram: false,
    isFetchingPhase: false,
    isFetchingTask: false,
    isFetchingChecklist: false,
    isFetchingAnswer: false,

  } as unknown as IProgramStore,
  reducers: {
    setSelectedPhase: (state, payload) => ({ ...state, selectedPhase: payload }),
    setProgram: (state, payload) => ({ ...state, program: payload }),
    setChecklists: (state, payload) => ({ ...state, checklists: payload }),
    setSeletedTask: (state, payload) => ({ ...state, selectedTask: payload }),
    setListImages: (state, payload) => ({ ...state, imageList: payload }),
    setIsFetchingProgram: (state, payload) => ({ ...state, isFetchingProgram: payload }),
    setIsFetchingPhase: (state, payload) => ({ ...state, isFetchingPhase: payload }),
    setIsFetchingTask: (state, payload) => ({ ...state, isFetchingTask: payload }),
    setIsFetchingChecklist: (state, payload)=>({...state, isFetchingChecklist: payload}),
    setIsFetchingAnswer:(state, payload)=>({...state, isFetchingAnswer: payload}),
  },
  effects: (dispatch: IRootDispatch) => ({

    async doFetchProgram({ id }) {
      const endpoint = `program/${id}`;
      dispatch.programStore.setIsFetchingProgram(true);
      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setProgram(response.data);
      } catch (error) {
        throw new Error('Failed to fetch program.');
      }
      dispatch.programStore.setIsFetchingProgram(false);

    },

    async doFetchImageList() {
      const endpoint = `image`;

      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setListImages(response.data);
      } catch (error) {
        throw new Error('Failed to fetch list images.');
      }
    },

    async doFetchDetailsPhase({ programId, phaseId }) {
      const endpoint = `program/${programId}/phase/${phaseId}`;
      dispatch.programStore.setIsFetchingPhase(true);
      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setSelectedPhase(response.data);
      } catch (error) {
        throw new Error('Failed to fetch phase.');
      }
      dispatch.programStore.setIsFetchingPhase(false);
    },

    async doFetchChecklists({ phaseId }) {
      const endpoint = `phase/${phaseId}/checklist`;

      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setChecklists(response.data);
      } catch (error) {
        throw new Error('Failed to fetch checklists.');
      }
    },

    async doFetchTasks({ checklistId }) {
      const endpoint = `checklist/${checklistId}/task`;
      dispatch.programStore.setIsFetchingChecklist(true);
      try {
        const response = await axiosClient.get(endpoint);
        let selectedPhase = _.cloneDeep(rootStore.getState().programStore.selectedPhase);
        let checklists = selectedPhase.checklists;
        let newChecklist = _.find(checklists, item => item.id === checklistId);
        newChecklist.tasks = response.data;
        let newChecklists = [..._.filter(checklists, item => item.id !== checklistId), newChecklist];
        newChecklists = _.sortBy(newChecklists, ['index']);
        selectedPhase.checklists = newChecklists;

        console.log(selectedPhase);
        dispatch.programStore.setSelectedPhase(selectedPhase);
      } catch (error) {
        throw new Error('Failed to fetch detail task.');
      }
      dispatch.programStore.setIsFetchingChecklist(false);
    },

    async doFetchDetailsTask({ checklistId, taskId }) {
      const endpoint = `checklist/${checklistId}/task/${taskId}`;
      dispatch.programStore.setIsFetchingTask(true);

      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setSeletedTask(response.data);
      } catch (error) {
        throw new Error('Failed to fetch detail task.');
      }
      dispatch.programStore.setIsFetchingTask(false);

    },
    /* Selected question effects */
    async doSubmitSelectedQuestionAnswer({ answers, taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);
      try {

        await axiosClient.post(endpoint, answers);

      } catch (error) {
        throw new Error('Failed to submit answer.');
      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doUpdateSubmitSelectedQuestionAnswer({ answers, taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {

        await axiosClient.put(endpoint, answers);

      } catch (error) {
        throw new Error('Failed to submit answer.');
      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doFetchSelectedQuestionAnswer({ taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {

        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answersSelectedQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        throw new Error('Failed to fetch answer.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    /* Constructed question effects */
    async doSubmitContructedQuestion({ answer, taskId }: { answer: { question: string }, taskId: number }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        await axiosClient.post(endpoint, answer);
      } catch (error) {
        throw new Error('Failed to submit answer.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doUpdateSubmitContructedQuestion({ answer, taskId }: { answer: { question: string }, taskId: number }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        await axiosClient.put(endpoint, answer);

      } catch (error) {
        throw new Error('Failed to submit answer.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doFetchContructedQuestionAnswer({ taskId }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerConstructedQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    /* Binary question effects */
    async doSubmitBinaryQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        await axiosClient.post(endpoint, answers);

      } catch (error) {
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doUpdateSubmitBinaryQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        await axiosClient.put(endpoint, answers);

      } catch (error) {
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doFetchBinaryQuestionAnswer({ taskId }) {
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerBinaryQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },
  }),

});

