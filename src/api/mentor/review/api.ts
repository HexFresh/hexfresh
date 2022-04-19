import axiosClient from '../../axiosClient';

export const getAllPhaseOfFresher = async (fresherId: string | undefined) => {
  const endpoint = `user/${fresherId}/current-program/phase`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllFresherChecklist = async (fresherId: string | undefined, phaseId: string | undefined) => {
  const endpoint = `user/${fresherId}/phase/${phaseId}/checklist`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserTask = async (
  fresherId: string | undefined,
  checklistId: string | undefined,
  taskId: string | undefined
) => {
  const endpoint = `user/${fresherId}/checklist/${checklistId}/task/${taskId}`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePointByMentor = async (
  fresherId: string | undefined,
  checklistId: string | undefined,
  taskId: string | undefined,
  pointByMentor: number
) => {
  const endpoint = `user/${fresherId}/checklist/${checklistId}/task/${taskId}/point`;
  try {
    const response = await axiosClient.put(endpoint, { pointByMentor });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
