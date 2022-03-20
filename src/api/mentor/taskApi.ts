import axiosClient from '../axiosClient';

export const getTask = async (checklistId: number, taskId: number) => {
  const endpoint = `checklist/${checklistId}/task/${taskId}`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (taskId: number, question: string) => {
  const endpoint = `task/${taskId}/quiz`;
  try {
    const response = await axiosClient.post(endpoint, { question });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (taskId: number, question: string) => {
  const endpoint = `task/${taskId}/quiz`;
  try {
    const response = await axiosClient.put(endpoint, { question });
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePointOfTask = async (
  checklistId: number,
  taskId: number,
  point: number
) => {
  const endpoint = `checklist/${checklistId}/task/${taskId}`;
  try {
    const response = await axiosClient.put(endpoint, { point });
    const { data } = response;

    return data;
  } catch (error) {
    console.log(error);
  }
};
