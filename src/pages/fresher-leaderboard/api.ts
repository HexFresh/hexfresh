import axiosClient from "../../api/axiosClient";

export const getFresherLeaderboard = async (query: any) => {
  const {limit, offset} = query;
  const endpoint = "program/leaderboard/current-leaderboard";
  try {
    const response = await axiosClient.get(endpoint, {
      params: {limit, offset},
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}