import axiosClient from './axiosClient';

export const getCurrentUserAccount = async () => {
  const endpoint = `user/info`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserProfile = async () => {
  const endpoint = `user/user-profile`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createCurrentNewEmptyUserProfile = async (userProfile: any) => {
  const endpoint = `user/user-profile`;
  try {
    const response = await axiosClient.post(endpoint, userProfile);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentUserProfile = async (userProfile: any) => {
  const endpoint = `user/user-profile`;
  try {
    const response = await axiosClient.put(endpoint, userProfile);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDegree = async () => {
  const endpoint = `degree`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobPosition = async () => {
  const endpoint = `job-position`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
