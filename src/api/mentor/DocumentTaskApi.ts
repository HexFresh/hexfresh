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

export const createFileInDocument = async (taskId: number, fileName: string) => {
  const endpoint = `task/${taskId}/document/file`;
  try {
    const response = await axiosClient.post(endpoint, { fileName });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFileInDocument = async (taskId: number, id: number) => {
  const endpoint = `task/${taskId}/document/file/${id}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDocument = async (taskId: number, document: any) => {
  const endpoint = `task/${taskId}/document`;
  try {
    const response = await axiosClient.put(endpoint, document);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
