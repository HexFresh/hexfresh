import { string } from "yup";
import { BooleanLocale } from "yup/lib/locale";
import { AttachmentStatus, TaskCategory, TaskStatus } from "../utilities/enum-utils";

export interface IPhase{
  id:string;
  name:string;
  imageSrc:string;
  checklists: ICheckList[];
}

export interface ICheckList{
  id:string;
  name:string;
  tasks: ITask[];
}

export interface ITask{
  id:string;
  name:string;
  type:TaskCategory;
  taskStatus: TaskStatus;
  optionnal:boolean;

  /* for assignment task */
  attachments:IAttachmentTask[];

  /* for single choice */
  /* for multiple choices */
  choices: IChoice[];

  //insert content for a detail task
}

export interface IAttachmentTask{
  attachmentId: string;
  attachmentUrl:string;
  attachmentStatus: AttachmentStatus;
  attachmentName:string;
}

export interface IChoice{
  choiceId: string;
  content: string;
  //isRight: boolean;
}