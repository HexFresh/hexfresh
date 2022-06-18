export interface IUser{
	id: number;
	userId: string,
	firstName: string,
	lastName: string,
	gender: string,
	dateOfBirth: string,
	phoneNumber: string,
  avatar: string,
  username: string,
  address: IAddress,
  degree: IDegree,
  job_position: IJobPosition,
}

export interface IAddress{
	id: number,
	country: string,
	province: string,
	district: string,
	ward: string,
	street: string,
	createdAt: string,
	updatedAt: string,
	userInforId: string,
}

export interface IDegree{
	id: number;
	name: string;
}

export interface IJobPosition{
	id: number;
	name: string;
}

export interface IQuickUser{
	id: string,
	username:string,
	email: string,
	roleId: number,
	isActive: boolean,
	user_information: IUser;
}

export interface IUserInformation{
	firstName: string,
	lastName: string,
	gender: string,
	dateOfBirth: string,
	phoneNumber: string,
  avatar: string,
  username: string,
  degreeId: IDegree,
  jobPosition: IJobPosition,
}