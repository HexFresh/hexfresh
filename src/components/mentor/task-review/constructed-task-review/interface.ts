export interface IConstructedTaskReview {
  id: number;
  isCompleted: boolean;
  pointByMentor: number;
  taskId: number;
  userId: string;
  user_constructed_question_answer: IUserConstructedQuestionAnswer;
  task: ITask;
}

export interface IUserConstructedQuestionAnswer {
  id: number;
  numberOfSubmissions: number;
  taskId: number;
  answer: string;
}

export interface ITask {
  id: number;
  quiz: IQuiz;
  constructed_question_answer: IConstructedQuestionAnswer;
  point: number;
  checklistId: number;
  index: number;
}

export interface IQuiz {
  question: string;
}

export interface IConstructedQuestionAnswer {
  id: number;
  isMatchingRequired: boolean;
  sampleAnswer: string;
}
