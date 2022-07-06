export interface IStats {
  taskStat: ITaskStat,
  tasksDoneByDate: ITaskDoneByDate[],
  pointsByDate: IPointByDate[],
}

export interface ITaskStat {
  total: number,
  done: number,
  correct: number,
  incorrect: number,
}

export interface ITaskDoneByDate {
  date: string,
  totalTasks: number,
}

export interface IPointByDate {
  date: string,
  totalpoints: number,
}