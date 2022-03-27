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
}


export const programStore: any = createModel<IRootStore>()({
  state: {
    program: {},
    selectedPhase: {},
    checklists: [],
    selectedTask: {},
    imageList: [],
  } as unknown as IProgramStore,
  reducers: {
    setSelectedPhase: (state, payload) => ({ ...state, selectedPhase: payload }),
    setProgram: (state, payload) => ({ ...state, program: payload }),
    setChecklists: (state, payload) => ({ ...state, checklists: payload }),
    setSeletedTask: (state, payload) => ({ ...state, selectedTask: payload }),
    setListImages: (state, payload) => ({ ...state, imageList: payload }),
  },
  effects: (dispatch: IRootDispatch) => ({
    /* async doFetchProgram(payload: IPhase) {
      console.log(payload,)
      dispatch.setSelectedProgram({});
    }, */

    async doFetchProgram({ id }) {
      const endpoint = `program/${id}`;

      try {
        const response = await axiosClient.get(endpoint);
        console.log(response.data);
        dispatch.programStore.setProgram(response.data);
      } catch (error) {
        throw new Error('Failed to fetch program.');
      }
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

      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setSelectedPhase(response.data);
      } catch (error) {
        throw new Error('Failed to fetch phase.');
      }
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

      try {
        const response = await axiosClient.get(endpoint);
        let selectedPhase = _.cloneDeep(rootStore.getState().programStore.selectedPhase);
        let checklists = selectedPhase.checklists;
        let newChecklist = _.find(checklists, item => item.id === checklistId);
        newChecklist.tasks = response.data;
        let newChecklists = [..._.filter(checklists, item => item.id !== checklistId), newChecklist];
        selectedPhase.checklists = newChecklists;

        console.log(selectedPhase);
        dispatch.programStore.setSelectedPhase(selectedPhase);
      } catch (error) {
        throw new Error('Failed to fetch detail task.');
      }
    },

    async doFetchDetailsTask({ checklistId, taskId }) {
      const endpoint = `checklist/${checklistId}/task/${taskId}`;

      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setSeletedTask(response.data);
      } catch (error) {
        throw new Error('Failed to fetch detail task.');
      }
    },
    /* Selected question effects */
    async doSubmitSelectedQuestionAnswer({ answers, taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      try {

        await axiosClient.post(endpoint, answers);

      } catch (error) {
        throw new Error('Failed to submit answer.');
      }

    },

    async doUpdateSubmitSelectedQuestionAnswer({ answers, taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      try {

        await axiosClient.put(endpoint, answers);

      } catch (error) {
        throw new Error('Failed to submit answer.');
      }

    },

    async doFetchSelectedQuestionAnswer({ taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      try {

        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answersSelectedQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        throw new Error('Failed to fetch answer.');

      }
    },

    /* Constructed question effects */
    async doSubmitContructedQuestion({ answer, taskId }: { answer: { question: string }, taskId: number }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;

      try {
        await axiosClient.post(endpoint, answer);
      } catch (error) {
        throw new Error('Failed to submit answer.');

      }
    },

    async doUpdateSubmitContructedQuestion({ answer, taskId }: { answer: { question: string }, taskId: number }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;

      try {
        await axiosClient.put(endpoint, answer);

      } catch (error) {
        throw new Error('Failed to submit answer.');

      }
    },

    async doFetchContructedQuestionAnswer({taskId}){
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerConstructedQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        throw new Error('Failed to fetch answers.');

      }
    },

    /* Binary question effects */
    async doSubmitBinaryQuestion({taskId, answers}){
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;

      try {
        await axiosClient.post(endpoint, answers);
        
      } catch (error) {
        throw new Error('Failed to submit answers.');

      }
    },

    async doUpdateSubmitBinaryQuestion({taskId, answers}){
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;

      try {
        await axiosClient.put(endpoint, answers);
        
      } catch (error) {
        throw new Error('Failed to submit answers.');

      }
    },

    async doFetchBinaryQuestion({taskId}){
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerBinaryQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        throw new Error('Failed to fetch answers.');

      }
    },
  }),

});

