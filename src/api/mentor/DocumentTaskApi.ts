import axiosClient from '../axiosClient';

export const getDocument = async (taskId: number) => {
  const endpoint = `task/${taskId}/document`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createEmptyDocument = async (taskId: number) => {
  const endpoint = `task/${taskId}/document`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
