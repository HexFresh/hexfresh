import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { map, random } from 'lodash';
import { IPointByDate, IStats, ITaskDoneByDate } from '../../../store/stats/stats.interface';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Your current status',
    },
  },
};


export const getData = (tasks: ITaskDoneByDate[], points: IPointByDate[]) => {
  const labels =map(tasks, task=> moment(task.date).format("MMM Do YY"));
  return {
    labels,
    datasets: [
      {
        label: 'Task done',
        data: map(tasks, task => task.totalTasks),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Points',
        data: map(points, point => point.totalpoints),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
};

export const FresherLineChart = ({ stats:{tasksDoneByDate, pointsByDate } }: { stats: IStats }) => {
const data = useMemo(()=> getData(tasksDoneByDate, pointsByDate),[pointsByDate, tasksDoneByDate]);

  return <Line className='mt-medium' options={options} data={data} />;
}