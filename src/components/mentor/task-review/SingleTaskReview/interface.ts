export interface ISingleTaskReview {
  id: number;
  isCompleted: boolean;
  pointByMentor: number;
  task: ISingleTask;
  taskId: number;
  userId: string;
  user_selected_question_answer: IUserSelectedQuestionAnswer;
}

export interface ISingleTask {
  id: number;
  quiz: IQuiz;
  point: number;
  checklistId: number;
  index: number;
  selected_question_choices: IUserSelectedQuestionChoice[];
}

export interface IQuiz {
  question: string;
}

export interface IUserSelectedQuestionChoice {
  id: number;
  content: string;
}

export interface IUserSelectedQuestionAnswer {
  id: number;
  numberOfSubmissions: number;
  taskId: number;
  answers: IAnswer[];
}

export interface IAnswer {
  choiceAnswer: boolean;
  choiceId: number;
}
