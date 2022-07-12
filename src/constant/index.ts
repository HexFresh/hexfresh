export const INT_ZERO = 0;
export const INT_ONE = 1;
export const INT_TWO = 2;
export const INT_THREE = 3;
export const INT_FOUR = 4;
export const DEFAULT_PAGE_SIZE = 24;
export enum USER_PROFILE_TABS{
  OVERVIEW = 'overview', //default tab
  INFORMATIONS = 'informations',
  BADGES = "badges",
}

 export const AVATAR_SYSTEM_SRC = "https://res.cloudinary.com/droruloek/image/upload/v1656213477/hexfresh/hexfresh_r6lvaq.svg";

 export const ROLE = Object.freeze({
  MENTOR: 'mentor',
  FRESHER: 'fresher',
 })

 export const USER_ROLE = Object.freeze({
  [ROLE.MENTOR]: INT_THREE,
  [ROLE.FRESHER]: INT_FOUR,
 })

 export const UPLOAD_FILE_SIZE = 25*1024*1024;