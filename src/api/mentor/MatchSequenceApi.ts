import axiosClient from '../axiosClient';

export const getAllOption = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/match-sequence/option/answer`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createOption = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/match-sequence/option`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOption = async (taskId: number, optionId: number, option: any) => {
  const endpoint = `task/${taskId}/quiz/match-sequence/option/${optionId}`;
  try {
    const response = await axiosClient.put(endpoint, option);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBulkOption = async (taskId: number, options: any) => {
  console.log(options);
  const endpoint = `task/${taskId}/quiz/match-sequence/bulk/option`;
  try {
    const response = await axiosClient.put(endpoint, { options });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOption = async (taskId: number, optionId: number) => {
  const endpoint = `task/${taskId}/quiz/match-sequence/option/${optionId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
