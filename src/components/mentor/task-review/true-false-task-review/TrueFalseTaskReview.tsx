import React, { useEffect, useState } from 'react';
import './true-false-task-review.css';
import { CircularProgress } from '@mui/material';
import { RadioButtonChecked, RadioButtonUnchecked, CheckCircleOutlined } from '@mui/icons-material';
import { getUserTask } from '../../../../api/mentor/review/api';
import { ITaskReview, ITrueFalseQuestionOption } from './interface';
import { useParams } from 'react-router-dom';
import { getAllOptionsWithAnswer } from '../../../../api/mentor/TrueFalseTaskApi';

export default function TrueFalseTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ITaskReview | null>(null);
  const [options, setOptions] = useState<ITrueFalseQuestionOption[]>([]);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchUserTask = async () => {
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);
  };

  const fecthOptions = async (id: number) => {
    const result = await getAllOptionsWithAnswer(id);
    setOptions(result || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserTask();
      await fecthOptions(selectedTask.id);
      setLoading(false);
    };
    fetchData();
    return () => {
      setLoading(false);
      setTask(null);
    };
  }, [selectedTask.id]);

  const isSelected = (id: number) => {
    if (task?.user_true_false_question_answer) {
      const tempOption = task?.user_true_false_question_answer?.answers.find((option: any) => option.optionId === id);
      if (tempOption) {
        return tempOption.userAnswer;
      } else {
        return 'No';
      }
    }
    return 'No';
  };

  const isUserSelected = (id: number) => {
    const answers = task?.user_true_false_question_answer?.answers;
    if (answers) {
      return answers.some((answer) => answer.optionId === id);
    }
    return false;
  };

  const isRightAnswer = (id: number) => {
    const answers = task?.user_true_false_question_answer?.answers;
    const selected = answers?.find((answer: any) => answer.optionId === id);
    if (answers) {
      return selected?.userAnswer === selected?.optionAnswer;
    }
    return false;
  };

  return (
    <div className="true-false-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="true-false-task-review__container">
          <div className="quiz">{task?.task?.quiz?.question}</div>
          <div className="true-false-task-review__top">
            <div className="true-false-task-review__top-true">True</div>
            <div className="true-false-task-review__top-false">False</div>
            <div className="true-false-task-review__top-option">Option</div>
          </div>

          <div className="true-false-task-review__answer">
            {options.map((option: ITrueFalseQuestionOption) => (
              <div key={option.id} className="true-false-task-review__answer-item">
                <div className="true-false-task-review__answer-item__top-true">
                  {isSelected(option.id) === 'No' ? (
                    <RadioButtonUnchecked />
                  ) : isSelected(option.id) ? (
                    <RadioButtonChecked />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </div>
                <div className="true-false-task-review__answer-item__top-false">
                  {isSelected(option.id) === 'No' ? (
                    <RadioButtonUnchecked />
                  ) : !isSelected(option.id) ? (
                    <RadioButtonChecked />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </div>
                <div
                  className={
                    isUserSelected(option.id)
                      ? isRightAnswer(option.id)
                        ? 'true-false-task-review__answer-item__top-option true'
                        : 'true-false-task-review__answer-item__top-option false'
                      : 'true-false-task-review__answer-item__top-option'
                  }
                >
                  {option.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
