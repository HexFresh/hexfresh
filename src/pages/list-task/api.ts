import axiosClient from "../../api/axiosClient";

export const getAllTask = async (checklistId: any) => {
  const endpoint = `checklist/${checklistId}/task`;
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllBadgesOfChecklist = async (checklistId: any) => {
  const endpoint = `checklist/${checklistId}/badge`;
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

export const addAvailableBadgeToChecklist = async (checklistId: any, badgeId: any) => {
  const endpoint = `checklist/${checklistId}/badge/${badgeId}`;
  try {
    const response = await axiosClient.post(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
}

export const addNewBadgeToChecklist = async (checklistId: any, badge: any) => {
  const endpoint = `checklist/${checklistId}/badge`;
  try {
    const response = await axiosClient.post(endpoint, badge);
    const {data} = response;
    return data;
  } catch (error) {
    return error;
  }
}

export const removeBadgeFromChecklist = async (checklistId: any, badgeId: any) => {
  const endpoint = `checklist/${checklistId}/badge/${badgeId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}