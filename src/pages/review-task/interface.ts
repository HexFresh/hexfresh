export interface IUserChecklist {
  id: number;
  checklistId: number;
  completedPercentage: number;
  isCompleted: boolean;
  numberOfCompletedTasks: number;
  phaseId: number;
  userId: string;
  checklist: IChecklist;
  tasks: ITask[];
  userTasks: IUserTask[];
}

export interface IChecklist {
  id: number;
  index: number;
  numberOfTasks: number;
  phaseId: number;
  title: string;
}

export interface ITask {
  checklistId: number;
  id: number;
  index: number;
  point: number;
  title: string;
  typeId: number;
}

export interface IUserTask {
  id: number;
  isCompleted: boolean;
  pointByMentor: number;
  taskId: number;
  userId: string;
}
