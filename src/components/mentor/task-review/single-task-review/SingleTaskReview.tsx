import React, { useEffect, useState } from 'react';
import './single-task-review.css';
import { CircularProgress } from '@mui/material';
import { RadioButtonChecked, RadioButtonUnchecked, CheckCircleOutlined } from '@mui/icons-material';
import { getUserTask } from '../../../../api/mentor/review/api';
import { getChoicesWithAnswer } from '../../../../api/mentor/SelectedChoiceTaskApi';
import { useParams } from 'react-router-dom';
import { ISingleTaskReview, ISelectedQuestionChoice, IUserSelectedQuestionAnswer } from './interface';

export default function SingleTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ISingleTaskReview | null>(null);
  const [choices, setChoices] = useState<ISelectedQuestionChoice[]>([]);
  const [userAnswer, setUserAnswer] = useState<IUserSelectedQuestionAnswer | null>(null);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchSingleTask = async () => {
    setLoading(true);
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);

    if (data) {
      fetchResultSingleTask(data?.task?.id);
      setUserAnswer(data?.user_selected_question_answer || {});
    }
  };

  const fetchResultSingleTask = async (id: number) => {
    const result = await getChoicesWithAnswer(id);
    setChoices(result || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleTask();

    return () => {
      setLoading(false);
      setTask(null);
      setChoices([]);
      setUserAnswer(null);
    };
  }, [selectedTask.id]);

  const isUserSelected = (id: number) => {
    const answers = userAnswer?.answers;
    if (answers) {
      return answers.some((answer) => answer.choiceId === id);
    }
    return false;
  };

  const isRightAnswer = (id: number) => {
    const answers = userAnswer?.answers;
    const selected = answers?.find((answer: any) => answer.choiceId === id);
    if (answers) {
      return selected?.choiceAnswer;
    }
    return false;
  };

  return (
    <div className="single-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="single-task-review__container">
          <div className="quiz">{task?.task?.quiz?.question}</div>
          <div className="choices">
            {choices.map((choice: any) => {
              return (
                <div
                  className={
                    isUserSelected(choice.id) ? (isRightAnswer(choice.id) ? 'choice true' : 'choice false') : 'choice'
                  }
                  key={choice.id}
                >
                  {isUserSelected(choice.id) ? (
                    <RadioButtonChecked style={{ color: 'white' }} />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                  <div className="choice__content">{choice.content}</div>
                  {choice.isRight && <CheckCircleOutlined className="true-answer" style={{ color: 'green' }} />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
