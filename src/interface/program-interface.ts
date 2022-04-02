import { string } from "yup";
import { AttachmentStatus, TaskCategory, TaskStatus } from "../utilities/enum-utils";

export interface IPhase{
  id:string;
  index: string;
  title:string;
  isCompleted:boolean;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  imageId: number;
  programId: number;
  image:IImage;
  name:string;
  checklists?: ICheckList[];
}
export interface ICheckList{
  id:number;
  index: number;
  title:string;
  isComplete: boolean;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  phaseId: string;
  tasks?: ITask[];
}

export interface ITask{
  id:number;
  title:string;
  index:string;
  point: number;
  isComplete: boolean;
  isChecked:boolean;
  isActive:boolean;
  createdAt:string;
  updatedAt:string;
  checklistId: string;
  typeId: number;
  quiz: IQuiz;
  selected_question_choices: ISelectedChoice[];
  constructed_question_answer: IContructedQuestion;
  true_false_question_options:IBinaryTask[];
  
  answersSelectedQuestion: IAnswerSelectedQuestion;
  answerConstructedQuestion: IAnswerContructedQuestion;
  answerBinaryQuestion: IAnswerBinaryQuestion;
}

export interface IQuiz{
  question: string;
}
export interface ISelectedChoice{
  id: number;
  content: string;
}

export interface IContructedQuestion{
  id: number;
  sampleAnswer: string;
  isMatchingRequired: boolean;
}

export interface IBinaryTask{
  id: string;
  content: string;
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

export interface IImage{
  id: number;
  description: string;
  imageLink: string;
  isActive?: boolean;
  createAt?: string;
  updateAt?: string;
}

export interface IAnswerSelectedQuestion{
  numberOfSubmissions: number,
  answers: IChoiceAnswerSelectedQuestion[];
}

export interface IChoiceAnswerSelectedQuestion{
  id: number;
  choiceAnswer: boolean|null;
}

export interface IAnswerContructedQuestion{
  id: number;
  answerId: number;
  numberOfSubmissions: number;
  answer: string;
  pointByMentor:number;
}

export interface IAnswerBinaryQuestion{
  id: number;
  numberOfSubmissions: number;
  answers: IChoiceBinaryQuestion[];
}

export interface IChoiceBinaryQuestion{
  id: number;
  userAnswer: boolean;
  OptionAnswer: boolean;
}