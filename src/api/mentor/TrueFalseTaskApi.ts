import axiosClient from '../axiosClient';

export const getAllOptionsWithAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/true-false-question/option/answer`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addEmptyOption = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/true-false-question/option`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOption = async (
  taskId: number,
  optionId: number,
  option: any
) => {
  const endpoint = `task/${taskId}/quiz/true-false-question/option/${optionId}`;
  try {
    const response = await axiosClient.put(endpoint, option);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOption = async (taskId: number, optionId: number) => {
  const endpoint = `task/${taskId}/quiz/true-false-question/option/${optionId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
