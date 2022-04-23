import React, { useEffect, useState } from 'react';
import './match-corresponding-task-review.css';
import { CircularProgress } from '@mui/material';
import { Button, Modal } from 'antd';
import { LineOutlined } from '@ant-design/icons';
import { getUserTask } from '../../../../api/mentor/review/api';
import { useParams } from 'react-router-dom';
import { ITaskReview, IAnswer, IMatchCorrespondingAnswer } from './interface';
import { getAllPairAnswer } from '../../../../api/mentor/MatchCorrespondingApi';

interface MatchCorrespondingPairAnswer {
  id: number;
  taskId: number;
  firstAnswer: Answer;
  secondAnswer: Answer;
}

interface Answer {
  id: number;
  content: string;
}

export default function MatchCorrespondingTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ITaskReview | null>(null);
  const [pairAnswers, setPairAnswers] = React.useState<MatchCorrespondingPairAnswer[]>([]);
  const [selectedPairAnswer, setSelectedPairAnswer] = useState<MatchCorrespondingPairAnswer | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchUserTask = async () => {
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);
  };

  const fecthPairAnswers = async () => {
    const result = await getAllPairAnswer(selectedTask.id);
    setPairAnswers(result || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserTask();
      await fecthPairAnswers();
      setLoading(false);
    };
    fetchData();
    return () => {
      setLoading(false);
      setTask(null);
      setPairAnswers([]);
    };
  }, [selectedTask.id]);

  const showModal = (id: number) => {
    const temp = pairAnswers.find((item) => item.firstAnswer.id === id);
    if (temp) {
      setSelectedPairAnswer(temp);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const getAnswerById = (id: number) => {
    if (task) {
      const answer = task.task.match_corresponding_answers.find(
        (answer: IMatchCorrespondingAnswer) => answer.id === id
      );
      if (answer) {
        return answer.content;
      }
    }
  };

  return (
    <div className="match-corresponding-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="match-corresponding-task-review__container">
          <div className="quiz">{task?.task.quiz.question}</div>
          {task?.user_match_corresponding_answer ? (
            <div className="match-corresponding-task-review__answer">
              {task.user_match_corresponding_answer.answers.map((answer: IAnswer, index: number) => (
                <div className="pair-answer" key={index}>
                  <div onClick={() => showModal(answer.firstCorrectAnswerId)} className="pair-answer-first">
                    {getAnswerById(answer.userFisrtAnswerId)}
                  </div>
                  <LineOutlined />
                  <div
                    className={
                      answer.secondCorrectAnswerId === answer.userSecondAnswerId
                        ? 'pair-answer-second-true'
                        : 'pair-answer-second-false'
                    }
                  >
                    {getAnswerById(answer.userSecondAnswerId)}{' '}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="match-corresponding-task-review__no-answer">
              {pairAnswers.map((pairAnswer: MatchCorrespondingPairAnswer) => (
                <div className="pair-answer" key={pairAnswer.id}>
                  <div className="pair-answer-first">{pairAnswer.firstAnswer.content}</div>
                  <LineOutlined />
                  <div className="pair-answer-second"> </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Modal
        className="modal"
        title={selectedPairAnswer?.firstAnswer.content}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button type="primary" key="ok" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div className="sample-answer">{selectedPairAnswer?.secondAnswer.content}</div>
      </Modal>
    </div>
  );
}
