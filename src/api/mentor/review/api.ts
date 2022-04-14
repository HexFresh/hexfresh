import axiosClient from '../../axiosClient';

export const getAllPhaseOfFresher = async (fresherId: string | undefined) => {
  const endpoint = `user/${fresherId}/program/1/phase`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
