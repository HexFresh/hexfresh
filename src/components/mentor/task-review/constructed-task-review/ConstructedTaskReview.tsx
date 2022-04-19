import React, { useEffect, useState } from 'react';
import './constructed-task-review.css';
import { CircularProgress } from '@mui/material';
import { getUserTask } from '../../../../api/mentor/review/api';
import { IConstructedTaskReview } from './interface';
import { useParams } from 'react-router-dom';

export default function ConstructedTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<IConstructedTaskReview | null>(null);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchSingleTask = async () => {
    setLoading(true);
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);
    console.log(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchSingleTask();

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div className="constructed-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="constructed-task-review__container">
          <div className="quiz">{task?.task?.quiz?.question}</div>
          <div className="user-answer">{task?.user_constructed_question_answer?.answer}</div>
        </div>
      )}
    </div>
  );
}
