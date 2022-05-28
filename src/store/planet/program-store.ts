import { createModel } from '@rematch/core';
import { notification } from 'antd';
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
  isSubmitingAnswer: boolean;
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
    isSubmitingAnswer: false,

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
    setIsFetchingChecklist: (state, payload) => ({ ...state, isFetchingChecklist: payload }),
    setIsFetchingAnswer: (state, payload) => ({ ...state, isFetchingAnswer: payload }),
    setIsSubmitingAnswer: (state, payload) => ({ ...state, isSubmitingAnswer: payload }),
  },
  effects: (dispatch: IRootDispatch) => ({

    async doFetchProgram() {
      const endpoint = `user/current-program`;
      dispatch.programStore.setIsFetchingProgram(true);
      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setProgram(response.data);
        const { programId } = response.data;

        dispatch.programStore.doFetchUserPhase({ programId });
      } catch (error) {
        dispatch.programStore.setIsFetchingProgram(false);
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
        dispatch.programStore.setIsFetchingPhase(false);
        throw new Error('Failed to fetch phase.');
      }
      dispatch.programStore.setIsFetchingPhase(false);
    },
    async doFetchUserPhase({ programId }) {
      const endpoint = `user/program/${programId}/phase`;
      dispatch.programStore.setIsFetchingPhase(true);
      try {
        const response = await axiosClient.get(endpoint);
        const program = _.cloneDeep(rootStore.getState().programStore.program);

        dispatch.programStore.setProgram({ ...program, userPhases: response.data });
      } catch (error) {
        dispatch.programStore.setIsFetchingPhase(false);
        throw new Error('Failed to fetch phase.');
      }
      dispatch.programStore.setIsFetchingPhase(false);
    },

    async doFetchUserPhaseDetail({ programId, phaseId }) {
      const endpoint = `user/program/${programId}/phase/${phaseId}`;
      dispatch.programStore.setIsFetchingPhase(true);
      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setSelectedPhase(response.data);
      } catch (error) {
        dispatch.programStore.setIsFetchingPhase(false);
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

    async doFetchUserChecklist({ phaseId }) {
      const endpoint = `user/phase/${phaseId}/checklist`;
      dispatch.programStore.setIsFetchingPhase(true);
      try {
        const response = await axiosClient.get(endpoint);
        const selectedPhase = _.cloneDeep(rootStore.getState().programStore.selectedPhase);
        dispatch.programStore.setSelectedPhase({ ...selectedPhase, userChecklists: response.data });
      } catch (error) {
        dispatch.programStore.setIsFetchingPhase(false);
        throw new Error('Failed to fetch checklists.');
      }
      dispatch.programStore.setIsFetchingPhase(false);
    },

    async doFetchUserTask({ checklistId, taskId }) {
      const endpoint = `user/checklist/${checklistId}/task/${taskId}`;
      dispatch.programStore.setIsFetchingTask(true);
      try {
        const response = await axiosClient.get(endpoint);
        dispatch.programStore.setSeletedTask(response.data);
        dispatch.programStore.setIsFetchingTask(false);

      } catch (error) {
        dispatch.programStore.setIsFetchingTask(false);
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
        let newChecklists = [ ..._.filter(checklists, item => item.id !== checklistId), newChecklist ];
        newChecklists = _.sortBy(newChecklists, [ 'index' ]);
        selectedPhase.checklists = newChecklists;

        dispatch.programStore.setSelectedPhase(selectedPhase);
      } catch (error) {
        dispatch.programStore.setIsFetchingChecklist(false);
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
        dispatch.programStore.setIsFetchingTask(false);
        throw new Error('Failed to fetch detail task.');
      }
      dispatch.programStore.setIsFetchingTask(false);

    },
    /* Selected question effects */
    async doSubmitSelectedQuestionAnswer({ answers, taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);
      try {

        await axiosClient.post(endpoint, answers);

      } catch (error) {
        console.log(error);
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answer.');
      }
      dispatch.programStore.setIsSubmitingAnswer(false);

    },

    async doUpdateSubmitSelectedQuestionAnswer({ answers, taskId }) {
      const endpoint = `user/task/${taskId}/quiz/selected-question/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {

        await axiosClient.put(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answer.');
      }
      dispatch.programStore.setIsSubmitingAnswer(false);

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
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answer.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    /* Constructed question effects */
    async doSubmitContructedQuestion({ answer, taskId }: { answer: { question: string }, taskId: number }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.post(endpoint, answer);
      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answer.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);

    },

    async doUpdateSubmitContructedQuestion({ answers, taskId }: { answers: { question: string }, taskId: number }) {
      const endpoint = `user/task/${taskId}/quiz/constructed-question/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);
      console.log(answers);
      try {
        await axiosClient.put(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answer.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);

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
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    /* Binary question effects */
    async doSubmitBinaryQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.post(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);

    },

    async doUpdateSubmitBinaryQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/true-false-question/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.put(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);

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
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    /* Match Sequence effects */
    async doSubmitMatchingSequenceQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/match-sequence/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.post(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);
    },

    async doUpdateMatchingSequenceQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/match-sequence/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.put(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);
    },

    async doFetchMatchingSequenceQuestionAnswer({ taskId }) {
      const endpoint = `user/task/${taskId}/quiz/match-sequence/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerMatchingSequenceQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    /* Match Corresponding effects */
    async doSubmitMatchingCorrespondingQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/match-corresponding/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.post(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);
    },

    async doUpdateMatchingCorrespondingQuestion({ taskId, answers }) {
      const endpoint = `user/task/${taskId}/quiz/match-corresponding/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        await axiosClient.put(endpoint, answers);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);
    },

    async doFetchMatchingCorrespondingQuestionAnswer({ taskId }) {
      const endpoint = `user/task/${taskId}/quiz/match-corresponding/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerMatchingCorrespondingQuestion = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);

    },

    async doSubmitAssignment({ taskId, answers }) {
      const endpointFile = `user/task/${taskId}/assignment/answer/file`;
      const endpoint = `user/task/${taskId}/assignment/answer`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        const payloadFile = { fileName: answers?.name };
        const responseWithUrl = await axiosClient.post(endpointFile, payloadFile);
        const { signedUrl, expiredTime, fileName, keyFileName, id } = responseWithUrl.data;

        let headers = new Headers();
        headers.append('Content-Type', `${answers.type}`);
        headers.append('Accept', `${answers.type}`);

        await fetch(signedUrl, {
          method: 'PUT',
          body: answers,
          headers,
          mode: 'cors',
        });

        const payload = {
          answer: "",
          fileList: [ { id: id } ]
        }

        await axiosClient.post(endpoint, payload);

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);
    },

    async doUpdateAssignment({ taskId, answers }) {
      const endpointFile = `user/task/${taskId}/assignment/answer/file`;
      dispatch.programStore.setIsSubmitingAnswer(true);

      try {
        const payloadFile = { fileName: answers?.name };
        /*         const responseWithUrl = await axiosClient.put(endpointFile, payloadFile);
                const { presignedUrl } = responseWithUrl.data;
        
                let headers = new Headers();
                headers.append('Content-Type', `${answers.type}`);
                headers.append('Accept', `${answers.type}`);
        
                const response = await fetch(signedUrl, {
                  method: 'PUT',
                  body: answers,
                  headers,
                  mode: 'cors',
                });
                console.log(response); */

      } catch (error) {
        dispatch.programStore.setIsSubmitingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to submit answers.');

      }
      dispatch.programStore.setIsSubmitingAnswer(false);
    },

    async doFetchUserAnswerAssignment({ taskId }) {
      const endpoint = `user/task/${taskId}/assignment/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        dispatch.programStore.doFetchAssignment({ taskId: taskId })

        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerAssignment = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);
    },

    async doFetchAssignment({ taskId }) {
      const endpoint = `task/${taskId}/assignment`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.assignment_question = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error(error);

      }
      dispatch.programStore.setIsFetchingAnswer(false);
    },

    async doFetchDocument({ taskId }) {
      const endpoint = `task/${taskId}/document`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.document_question = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error(error);

      }
      dispatch.programStore.setIsFetchingAnswer(false);
    },

    async doFetchUserAnswerDocument({ taskId }) {
      const endpoint = `user/task/${taskId}/document/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        dispatch.programStore.doFetchDocument({ taskId: taskId })

        const response = await axiosClient.get(endpoint);
        let task = _.cloneDeep(rootStore.getState().programStore.selectedTask);
        task.answerDocument = response.data;

        dispatch.programStore.setSeletedTask(task);
      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);
    },

    async doSubmitDocument({ taskId }) {
      const endpoint = `user/task/${taskId}/document/answer`;
      dispatch.programStore.setIsFetchingAnswer(true);

      try {
        await axiosClient.post(endpoint);

      } catch (error) {
        dispatch.programStore.setIsFetchingAnswer(false);
        notification.error({
          message: 'Failed to submit answer',
          description: error,
        });
        throw new Error('Failed to fetch answers.');

      }
      dispatch.programStore.setIsFetchingAnswer(false);
    },

  }),

});

