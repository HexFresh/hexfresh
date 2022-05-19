export interface IUserProfile {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  gender: string | undefined;
  dateOfBirth: string | undefined;
  phoneNumber: string | undefined;
  avatar: string | undefined;
  userId: string | undefined;
  degreeId: number | undefined;
  jobPositionId: number | undefined;
  address:
    | {
        id: number | undefined;
        country: string | undefined;
        province: string | undefined;
        district: string | undefined;
        ward: string | undefined;
        street: string | undefined;
      }
    | undefined;
  degree:
    | {
        id: number | undefined;
        name: string | undefined;
      }
    | undefined;
  job_position:
    | {
        id: number | undefined;
        name: string | undefined;
      }
    | undefined;
}

export interface IUserAccount {
  id: number | undefined;
  email: string | undefined;
  username: string | undefined;
}

export interface IProvince {
  code: number | undefined;
  name: string | undefined;
}

export interface IDistrict {
  code: number | undefined;
  name: string | undefined;
}

export interface IWard {
  code: number | undefined;
  name: string | undefined;
}

export interface IDegree {
  id: number | undefined;
  name: string | undefined;
}

export interface IJobPosition {
  id: number | undefined;
  name: string | undefined;
}
