import React, { useEffect, useState } from 'react';
import './match-sequence-task-review.css';
import { CircularProgress } from '@mui/material';
import { getUserTask } from '../../../../api/mentor/review/api';
import { useParams } from 'react-router-dom';
import { ITaskReview, IMatchSequenceQuestionOption } from './interface';
import { getAllOption } from '../../../../api/mentor/MatchSequenceApi';
import { sortByField } from '../../../../utils/common';

export default function MatchSequenceTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ITaskReview | null>(null);
  const [options, setOptions] = useState<IMatchSequenceQuestionOption[]>([]);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  console.log({ task, options });

  const fetchUserTask = async () => {
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);
  };

  const fecthOptions = async () => {
    const result = await getAllOption(selectedTask.id);
    setOptions(result || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserTask();
      await fecthOptions();
      setLoading(false);
    };
    fetchData();
    return () => {
      setLoading(false);
    };
  }, [selectedTask.id]);

  const getContentOfOption = (optionId: number) => {
    const option = options.find((option) => option.id === optionId);
    return option?.content;
  };

  return (
    <div className="match-sequence-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="match-sequence-task-review__container">
          <div className="quiz">{task?.task.quiz.question}</div>
          {task?.user_match_sequence_answer ? (
            <div className="match-sequence-task-review__answer">
              {task.user_match_sequence_answer.answers.map((answer: any, index: number) => (
                <div key={index} className="match-sequence-task-review__answer-item">
                  <div
                    className={
                      answer.userAnswer === answer.optionIndexAnswer
                        ? 'match-sequence-task-review__answer-item-content-true'
                        : 'match-sequence-task-review__answer-item-content-false'
                    }
                  >
                    {getContentOfOption(answer.optionId)}
                  </div>
                  <div className="match-sequence-task-review__answer-item-real">{answer.optionIndexAnswer}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="match-sequence-task-review__no-answer">
              {sortByField(options, 'index').map((option: any) => (
                <div key={option.id} className="match-sequence-task-review__no-answer__content">
                  {option.content}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
