import axiosClient from "../../api/axiosClient";

export const findAllUsersInLeaderboard = async (programId: any) => {
  const endpoint = `program/${programId}/leaderboard`;
  try {
    const response = await axiosClient.get(endpoint);
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}