import axiosClient from '../axiosClient';

export const getAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/constructed-question/answer`;
  const response = await axiosClient.get(endpoint);
  console.log(response);
  return response;
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

export const updateAnswer = async (
  taskId: number,
  answerId: number,
  answer: any
) => {
  const endpoint = `task/${taskId}/quiz/constructed-question/answer/${answerId}`;
  try {
    const response = await axiosClient.put(endpoint, answer);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (taskId: number, answerId: number) => {
  const endpoint = `task/${taskId}/quiz/constructed-question/answer/${answerId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
