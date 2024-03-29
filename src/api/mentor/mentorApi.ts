import axiosClient from '../axiosClient';

export const getPrograms = async (query: any) => {
  const {keyword, limit, offset} = query;
  const endpoint = `program`;
  try {
    const response = await axiosClient.get(endpoint, {
      params: {keyword, limit, offset},
    });
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
};

export const getProgramById = async (id: number) => {
  const endpoint = `program/${id}`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProgramDetail = async (id: any) => {
  const endpoint = `program/${id}/people`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
};

export const getPhasesOfProgram = async (programId: number, keyword: string) => {
  const endpoint = `program/${programId}/phase`;
  try {
    const response = await axiosClient.get(endpoint, {
      params: {keyword},
    });
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPhaseById = async (programId: number, id: number) => {
  const endpoint = `program/${programId}/phase/${id}`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPhase = async (programId: number, phase: any) => {
  const endpoint = `program/${programId}/phase`;
  try {
    const response = await axiosClient.post(endpoint, phase);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePhase = async (programId: number, phaseId: number, phase: any) => {
  const endpoint = `program/${programId}/phase/${phaseId}`;
  try {
    const response = await axiosClient.put(endpoint, phase);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePhase = async (programId: number, phaseId: number) => {
  const endpoint = `program/${programId}/phase/${phaseId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChecklist = async (phaseId: number) => {
  const endpoint = `phase/${phaseId}/checklist`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getChecklistById = async (phaseId: number, id: number) => {
  const endpoint = `phase/${phaseId}/checklist/${id}`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const createChecklist = async (phaseId: number, checklist: any) => {
  const endpoint = `phase/${phaseId}/checklist`;
  try {
    const response = await axiosClient.post(endpoint, checklist);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (checklistId: number, task: any) => {
  const endpoint = `checklist/${checklistId}/task`;
  try {
    const response = await axiosClient.post(endpoint, task);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const assignProgramToFresher = async (userId: string, programId: number) => {
  const endpoint = `program-permission`;
  try {
    const response = await axiosClient.post(endpoint, {userId, programId});
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProgramFromFresher = async (userId: string, programId: number) => {
  const endpoint = `program-permission`;
  try {
    const response = await axiosClient.delete(endpoint, {data: {userId, programId}});
    const {data} = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getImages = async (tag: string = "") => {
  const endpoint = `image`;
  try {
    const response = await axiosClient.get(endpoint, {
      params: {tag},
    });
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllFresher = async (query: any) => {
  const endpoint = `user/fresher`;
  const {keyword, limit, offset} = query;
  try {
    const response = await axiosClient.get(endpoint, {
      params: {keyword, limit, offset},
    });
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
};


export const getStatistic = async () => {
  const endpoint = `stat/dashboard-mentor`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getStatOfProgram = async (programId: string) => {
  const endpoint = `stat/program/${programId}`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getBadgeOfProgram = async (id: any) => {
  const endpoint = `program/${id}/badge`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}
