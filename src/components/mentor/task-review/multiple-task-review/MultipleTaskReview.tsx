import React, { useEffect, useState } from 'react';
import './multiple-task-review.css';
import { CircularProgress } from '@mui/material';
import { CheckBoxOutlineBlankOutlined, IndeterminateCheckBox, CheckBoxOutlined } from '@mui/icons-material';
import { getUserTask } from '../../../../api/mentor/review/api';
import { getChoicesWithAnswer } from '../../../../api/mentor/SelectedChoiceTaskApi';
import { useParams } from 'react-router-dom';
import { ISingleTaskReview, ISelectedQuestionChoice, IUserSelectedQuestionAnswer } from './interface';

export default function MultipleTaskReview(props: any) {
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

  console.log({ choices, task, userAnswer });

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
  }, []);

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
    <div className="multiple-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="multiple-task-review__container">
          <div className="quiz">{task?.task?.quiz?.question}</div>
          <div className="choices">
            {choices.map((choice: any, index) => {
              return (
                <div
                  className={
                    isUserSelected(choice.id) ? (isRightAnswer(choice.id) ? 'choice true' : 'choice false') : 'choice'
                  }
                  key={choice.id}
                >
                  {isUserSelected(choice.id) ? (
                    <IndeterminateCheckBox style={{ color: 'white' }} />
                  ) : (
                    <CheckBoxOutlineBlankOutlined />
                  )}
                  <div className="choice__content">{choice.content}</div>
                  {choice.isRight && <CheckBoxOutlined className="true-answer" style={{ color: 'green' }} />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
