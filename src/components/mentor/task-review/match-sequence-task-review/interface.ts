export interface ITaskReview {
  id: number;
  isCompleted: boolean;
  pointByMentor: number;
  taskId: number;
  userId: string;
  user_match_sequence_answer: IUserMatchSequenceQuestionOption;
  task: ITask;
}

export interface IUserMatchSequenceQuestionOption {
  id: number;
  numberOfSubmissions: number;
  taskId: number;
  answers: IAnswer[];
}

export interface IAnswer {
  optionIndexAnswer: number;
  optionId: number;
  userAnswer: number;
}

export interface ITask {
  id: number;
  quiz: IQuiz;
  match_sequence_options: IMatchSequenceQuestionOption[];
  point: number;
  checklistId: number;
  index: number;
}

export interface IQuiz {
  question: string;
}

export interface IMatchSequenceQuestionOption {
  id: number;
  content: string;
  index: number;
}
