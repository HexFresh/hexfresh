import { AttachmentStatus } from "../utils/enum-utils";

export interface IProgram {
  id: number,
  programId: number,
  title: string,
  numberOfPhases: number,
  createdAt: string,
  updatedAt: string,
  imageId: number,
  authorId: string,
  image: IQuickImage,
}

export interface IQuickImage {
  id: number,
  description: string,
  imageLink: string,
}
export interface IPhase {
  phase?: IPhaseDetail;
  id: string;
  index: string;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  imageId: number;
  programId: number;
  image: IImage;
  name: string;
  numberOfCompletedChecklists: number;
  completedPercentage: number;
  checklists?: ICheckList[];
}

export interface IPhaseDetail {
  id: string;
  index: string;
  title: string;
  isCompleted: boolean;
  createAt: string;
  updateAt: string;
  imageId: number;
  programId: number;
  image: IImage;
}
export interface ICheckList {
  id: number;
  index: number;
  title: string;
  isComplete: boolean;
  isActive: boolean;
  createAt: string;
  updateAt: string;
  phaseId: string;
  tasks?: ITask[];
}
export interface ITask {
  id: number;
  title: string;
  index: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  checklistId: string;
  typeId: number;
  quiz: IQuiz;
  selected_question_choices: ISelectedChoice[];
  constructed_question_answer: IContructedQuestion;
  true_false_question_options: IBinaryTask[];
  match_sequence_options: ISequenceTask[];
  match_corresponding_answers: ICorrespondingTassk[];
  assignment: IAssignemtTask;
  document: IDocumentTask;

}
export interface ISelectedTask {
  id: number;
  taskId: number;
  userId: string;
  isCompleted: boolean;
  isRight: boolean;
  pointByMentor: number;

  task: ITask;

  user_selected_question_answer: IAnswerSelectedQuestion;
  user_constructed_question_answer: IAnswerContructedQuestion;
  user_true_false_question_answer: IAnswerBinaryQuestion;
  user_match_sequence_answer: IAnswerMatchingSequenceQuestion;
  user_match_corresponding_answer: IAnswerMatchingCorrespondingQuestion;
  user_document_answer: IAnswerDocument;
  user_assignment_answer: IAnswerAssignment;
}

export interface IAssignmentFile {
  expiredTime: number;
  fileName: string;
  id: number;
  keyFileName: string;
  presignUrl: string;
}

export interface IAnswerAssignment {
  answer: string;
  createdAt: string;
  fileList: IAssignmentFile[];
  id: number;
  keyFileName: string;
  presignUrl: string;
}

export interface IAnswerDocument {
  documentId: number;
  id: number;
  isRead: boolean;
  numberOfSubmissions: number;
  userTaskId: number;
}

export interface IDocumentTask {
  id: number;
  taskId: number;
  title: string;
  document: string;
  fileList: IAssignmentFile[];
}
export interface IAssignemtTask {
  description: string;
  dueDate: string;
  fileList: IAssignmentFile[];
  id: number;
  taskId: number;
  title: string;
}

export interface IQuiz {
  question: string;
}
export interface ISelectedChoice {
  id: number;
  content: string;
}

export interface IContructedQuestion {
  id: number;
  sampleAnswer: string;
  isMatchingRequired: boolean;
}

export interface IBinaryTask {
  id: string;
  content: string;
}

export interface ISequenceTask {
  id: number;
  content: string;
}

export interface IAttachmentTask {
  attachmentId: string;
  attachmentUrl: string;
  attachmentStatus: AttachmentStatus;
  attachmentName: string;
}

export interface IChoice {
  choiceId: string;
  content: string;
  //isRight: boolean;
}

export interface IImage {
  id: number;
  description: string;
  imageLink: string;
  isActive?: boolean;
  createAt?: string;
  updateAt?: string;
}

export interface IAnswerSelectedQuestion {
  numberOfSubmissions: number,
  answers: IChoiceAnswerSelectedQuestion[];
}

export interface IChoiceAnswerSelectedQuestion {
  choiceId: number;
  choiceAnswer: boolean | null;
}

export interface IAnswerContructedQuestion {
  id: number;
  answerId: number;
  numberOfSubmissions: number;
  answer: string;
  pointByMentor: number;
}

export interface IAnswerBinaryQuestion {
  id: number;
  numberOfSubmissions: number;
  answers: IChoiceBinaryQuestion[];
}

export interface IChoiceBinaryQuestion {
  optionId: number;
  userAnswer: boolean;
  optionAnswer: boolean;
}

export interface IMactchSequence {
  id: number;
  content: string;
}

export interface IAnswerMatchingSequenceQuestion {
  id: number;
  numberOfSubmissions: number;
  answers: IChoiceSequenceQuestion[];
}

export interface IChoiceSequenceQuestion {
  optionId: number;
  userAnswer: number;
  optionIndexAnswer: number;
}

export interface ICorrespondingTassk {
  id: number;
  content: string;
  index: number;
}

export interface IAnswerMatchingCorrespondingQuestion {
  id: number;
  numberOfSubmissions: number;
  answers: IChoiceCorrespondingQuestion[];
}

export interface IChoiceCorrespondingQuestion {
  firstCorrectAnswerId: number;
  secondCorrectAnswerId: number;
  userFisrtAnswerId: number;
  userSecondAnswerId: number;
}