import axiosClient from '../axiosClient';

export const getAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/constructed-question/answer`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createEmptyAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/constructed-question/answer`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
