import React, { useEffect, useState } from 'react';
import './single-task-review.css';
import { CircularProgress } from '@mui/material';
import { getUserTask } from '../../../../api/mentor/review/api';
import { useParams } from 'react-router-dom';
import { ISingleTaskReview } from './interface';

export default function SingleTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ISingleTaskReview | null>(null);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchSingleTask = async () => {
    setLoading(true);
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleTask();
  }, []);

  return (
    <div className="single-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="single-task-review__container">
          <div className="quiz">{task?.task?.quiz?.question}</div>
        </div>
      )}
    </div>
  );
}
