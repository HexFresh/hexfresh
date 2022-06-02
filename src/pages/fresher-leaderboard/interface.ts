export interface ILeaderboard {
  user_leaderboards: IUserLeaderboard[];
}

export interface IUserLeaderboard {
  point: number;
  user: IUser;
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