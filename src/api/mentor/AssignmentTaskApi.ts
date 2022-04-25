import axiosClient from '../axiosClient';

export const getAssignment = async (taskId: number) => {
  const endpoint = `task/${taskId}/assignment`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    return null;
  }
};

export const createEmptyAssignment = async (taskId: number) => {
  const endpoint = `task/${taskId}/assignment`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAssignment = async (taskId: number, assignment: any) => {
  const endpoint = `task/${taskId}/assignment`;
  try {
    const response = await axiosClient.put(endpoint, assignment);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createFileInAssignment = async (taskId: number, fileName: string) => {
  const endpoint = `task/${taskId}/assignment/file`;
  try {
    const response = await axiosClient.post(endpoint, { fileName });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFileInAssignment = async (taskId: number, id: number) => {
  const endpoint = `task/${taskId}/assignment/file/${id}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
