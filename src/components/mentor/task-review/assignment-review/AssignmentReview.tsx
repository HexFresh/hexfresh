/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './assignment-review.css';
import { CircularProgress, InputBase } from '@mui/material';
import { getUserTask, updatePointByMentor } from '../../../../api/mentor/review/api';
import { useParams } from 'react-router-dom';
import { ITaskReview } from './interface';
import { message } from 'antd';
import moment from 'moment';

const cutString = (str: string) => {
  if (str.length > 80) {
    return str.slice(0, 80) + '...';
  }
  return str;
};

export default function AssignmentReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ITaskReview | null>(null);
  const [point, setPoint] = useState<number>(0);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchUserTask = async () => {
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    console.log(data);
    setTask((data as ITaskReview) || null);
    setPoint(data.pointByMentor);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserTask();
      setLoading(false);
    };
    fetchData();
    return () => {
      setLoading(false);
      setTask(null);
    };
  }, [selectedTask.id]);

  const handleUpdatePointByMentor = async () => {
    if (point === 0) {
      message.error('Please enter point', 1);
      return;
    } else {
      const result = await updatePointByMentor(fresherId, selectedTask.checklistId, selectedTask.id, point);
      if (result) {
        message.success('Update point successfully', 1);
      }
    }
  };

  return (
    <div className="assignment-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="assignment-review__container">
          <div className="point-by-mentor">
            <InputBase
              onBlur={() => handleUpdatePointByMentor()}
              onChange={(e) => setPoint(Number(e.target.value))}
              type="number"
              className="point-by-mentor__input"
              value={point}
            />
          </div>
          <div className="title">
            <div className="description__title">Title:</div>
            <div className="description__content">{task?.task.assignment.title}</div>
          </div>
          <div className="description">
            <div className="description__title">Description:</div>
            <div className="description__content">{task?.task.assignment.description}</div>
          </div>
          <div className="description">
            <div className="description__title">Deadline:</div>
            <div className="description__content">{`${moment(task?.task.assignment.dueDate).format(
              'DD-MM-YYYY'
            )}`}</div>
          </div>

          <div className="description">
            <div className="description__title">User submitted:</div>
          </div>

          <div className="list-file">
            {task?.user_assignment_answer?.fileList.map((file: any) => {
              return (
                <a target="_blank" rel="noreferrer" href={file.presignUrl} className="file-item" key={file.id}>
                  <div className="file-item__name">{cutString(file.fileName)}</div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
