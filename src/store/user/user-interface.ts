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