import React, { useEffect, useState } from 'react';
import './constructed-task-review.css';
import { CircularProgress, duration, InputBase } from '@mui/material';
import { Button, message, Modal } from 'antd';
import { getUserTask, updatePointByMentor } from '../../../../api/mentor/review/api';
import { IConstructedTaskReview, IConstructedQuestionAnswer } from './interface';
import { useParams } from 'react-router-dom';
import { getAnswer } from '../../../../api/mentor/ConstructedTaskApi';

export default function ConstructedTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [task, setTask] = useState<IConstructedTaskReview | null>(null);
  const [answer, setAnswer] = React.useState<IConstructedQuestionAnswer | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [point, setPoint] = useState<number>(0);

  const { selectedTask } = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchUserTask = async () => {
    setLoading(true);
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    setTask(data);
    setPoint(data.pointByMentor);
    setLoading(false);
  };

  const fecthAnswers = async () => {
    const result = await getAnswer(selectedTask.id);
    setAnswer(result);
  };

  useEffect(() => {
    fetchUserTask();
    fecthAnswers();
    return () => {
      setLoading(false);
      setTask(null);
      setAnswer(null);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="constructed-task-review">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="constructed-task-review__container">
          <div className="quiz">{task?.task?.quiz?.question}</div>
          <div className="user-answer">{task?.user_constructed_question_answer?.answer}</div>
          <div className="view-answer-btn">
            <Button onClick={showModal} type="primary">
              View Answer
            </Button>
          </div>
          <div className="point-by-mentor__point">
            <InputBase
              onBlur={() => handleUpdatePointByMentor()}
              onChange={(e) => setPoint(Number(e.target.value))}
              type="number"
              className="point-by-mentor__input"
              value={point}
            />
          </div>
        </div>
      )}
      <Modal
        className="modal"
        title="View answer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button type="primary" key="ok" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div className="sample-answer">{answer?.sampleAnswer}</div>
      </Modal>
    </div>
  );
}
