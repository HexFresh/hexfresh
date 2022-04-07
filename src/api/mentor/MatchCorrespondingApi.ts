import axiosClient from '../axiosClient';

export const getAllPairAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/match-corresponding/pair-answer`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPairAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/match-corresponding/pair-answer`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleUpdateAnswer = async (taskId: number, answerId: number, answer: string) => {
  const endpoint = `task/${taskId}/quiz/match-corresponding/pair-answer/answer/${answerId}`;
  try {
    const response = await axiosClient.put(endpoint, { content: answer });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deletePairAnswer = async (taskId: number, answerId: number) => {
  const endpoint = `task/${taskId}/quiz/match-corresponding/pair-answer/${answerId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
