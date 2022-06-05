export interface ILeaderboard {
  user_leaderboards: IUserLeaderboard;
}

export interface IUserLeaderboard {
  count: number;
  rows: IUserLeaderboardRow[];
}

export interface IUserLeaderboardRow {
  point: number;
  user: IUser;
  userId: string;
}

export interface IUser {
  username: string;
  user_information: IUserInformation;
}

export interface IUserInformation {
  avatar: string;
  firstName: string;
  lastName: string;
}