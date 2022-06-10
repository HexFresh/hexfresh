import axiosClient from "../../api/axiosClient";

export const getAllChecklist = async (phaseId: any) => {
  const endpoint = `phase/${phaseId}/checklist`;
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllBadgesOfChecklist = async (checklistId: any) => {
  const endpoint = `phase/${checklistId}/badge`;
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getBadges = async (query: any) => {
  const {keyword, limit, offset} = query;
  const endpoint = `badge`;
  try {
    const response = await axiosClient.get(endpoint, {
      params: {keyword, limit, offset},
    });
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
}

export const addAvailableBadgeToPhase = async (phaseId: any, badgeId: any) => {
  const endpoint = `phase/${phaseId}/badge/${badgeId}`;
  try {
    const response = await axiosClient.post(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
}

export const addNewBadgeToPhase = async (phaseId: any, badge: any) => {
  const endpoint = `phase/${phaseId}/badge`;
  try {
    const response = await axiosClient.post(endpoint, badge);
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
}

export const removeBadgeFromPhase = async (phaseId: any, badgeId: any) => {
  const endpoint = `phase/${phaseId}/badge/${badgeId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}