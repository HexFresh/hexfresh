export interface ITaskReview {
  id: number;
  isCompleted: boolean;
  isRight: boolean;
  pointByMentor: number;
  task: ITask;
  taskId: number;
  userId: string;
  user_assignment_answer: IUserAssignmentAnswer;
}

export interface IUserAssignmentAnswer {
  answer: string;
  fileList: IFile[];
  id: number;
  numberOfSubmissions: number;
  taskId: number;
}

export interface IFile {
  id: number;
  fileName: string;
  presignUrl: string;
}

export interface ITask {
  id: number;
  assignment: IAssignment;
}

export interface IQuiz {
  question: string;
}

export interface IAssignment {
  id: number;
  title: string;
  description: number;
  dueDate: string;
}
