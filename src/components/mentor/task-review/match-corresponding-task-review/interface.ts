export interface ITaskReview {
  id: number;
  isCompleted: boolean;
  pointByMentor: number;
  taskId: number;
  userId: string;
  user_match_corresponding_answer: IUserMatchCorrespondingAnswer;
  task: ITask;
}

export interface IUserMatchCorrespondingAnswer {
  id: number;
  numberOfSubmissions: number;
  taskId: number;
  answers: IAnswer[];
}

export interface IAnswer {
  firstCorrectAnswerId: number;
  secondCorrectAnswerId: number;
  userFisrtAnswerId: number;
  userSecondAnswerId: number;
}

export interface ITask {
  id: number;
  quiz: IQuiz;
  match_corresponding_answers: IMatchCorrespondingAnswer[];
  point: number;
  checklistId: number;
  index: number;
}

export interface IQuiz {
  question: string;
}

export interface IMatchCorrespondingAnswer {
  id: number;
  content: string;
  index: number;
}
