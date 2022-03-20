import axiosClient from '../axiosClient';

export const getPrograms = async () => {
  const endpoint = `program`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProgramById = async (id: number) => {
  const endpoint = `program/${id}`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPhasesOfProgram = async (programId: number) => {
  const endpoint = `program/${programId}/phase`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPhase = async (programId: number, phase: any) => {
  const endpoint = `program/${programId}/phase`;
  try {
    const response = await axiosClient.post(endpoint, phase);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePhase = async (programId: number, phaseId: number) => {
  const endpoint = `program/${programId}/phase/${phaseId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChecklist = async (phaseId: number) => {
  const endpoint = `phase/${phaseId}/checklist`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createChecklist = async (phaseId: number, checklist: any) => {
  const endpoint = `phase/${phaseId}/checklist`;
  try {
    const response = await axiosClient.post(endpoint, checklist);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (checklistId: number, task: any) => {
  const endpoint = `checklist/${checklistId}/task`;
  try {
    const response = await axiosClient.post(endpoint, task);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
