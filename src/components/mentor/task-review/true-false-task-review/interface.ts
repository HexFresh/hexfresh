export interface ITaskReview {
  id: number;
  isCompleted: boolean;
  pointByMentor: number;
  taskId: number;
  userId: string;
  user_true_false_question_answer: IUserTrueFalseQuestionOption;
  task: ITask;
}

export interface IUserTrueFalseQuestionOption {
  id: number;
  numberOfSubmissions: number;
  taskId: number;
  answers: IAnswer[];
}

export interface IAnswer {
  optionAnswer: boolean;
  optionId: number;
  userAnswer: boolean;
}

export interface ITask {
  id: number;
  quiz: IQuiz;
  true_false_question_options: ITrueFalseQuestionOption[];
  point: number;
  checklistId: number;
  index: number;
}

export interface IQuiz {
  question: string;
}

export interface ITrueFalseQuestionOption {
  id: number;
  content: string;
  isRight: boolean;
}
