import React, { useCallback, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { map, max } from 'lodash';
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

export const FresherLineChart = ({ stats: { tasksDoneByDate, pointsByDate } }: { stats: IStats }) => {
  const getOptions = useCallback((): ChartOptions<'line'> => {
    const tasks = tasksDoneByDate;
    
    const totalTasks = map(tasks, task => task.totalTasks);
    const maxTotalTask = max(totalTasks) || 0;
    const displayMaxTotalTask = maxTotalTask % 10 === 0 ? max(totalTasks) : maxTotalTask + (10 - maxTotalTask % 10);
  
    return {
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
      scales: {
        y:{
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Ex 1'
          }
        },
        z: {
          display: true,
          min: 0,
          max: displayMaxTotalTask,
          position: 'right',
          title: {
            display: true,
            text: 'Ex 2'
          }
        }
      }
    }
  }, [tasksDoneByDate]);
  
  
  const getData = useCallback((): ChartData<'line'> => {
    const tasks = tasksDoneByDate;
    const points = pointsByDate;
    const labels = map(tasks, task => moment(task.date).format("MMM Do YY"));
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
  },[pointsByDate, tasksDoneByDate]);
  const data1 = {
    labels: map(tasksDoneByDate, task => moment(task.date).format("MMM Do YY")),
    datasets: [
      {
        label: 'Points',
        data: map(pointsByDate, point => point.totalpoints),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const data2 = {
    labels: map(tasksDoneByDate, task => moment(task.date).format("MMM Do YY")),
    datasets: [
      {
        label: 'Task done',
        data: map(tasksDoneByDate, task => task.totalTasks),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const options2: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your current task done status',
      },
    },
    scales: {
      y:{
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Number of task done by date'
        }
      },
    }
  }

  const options1: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your current user\'s point status',
      },
    },
    scales: {
      y:{
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Number of user\'s point by date'
        }
      },
    }
  }

  return <>
    <Line className='mt-medium' options={options1} data={data1} />
    <Line className='mt-medium' options={options2} data={data2} />
  </>
}