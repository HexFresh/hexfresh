import React from 'react';
import InputBase from '@mui/material/InputBase';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { CircularProgress } from '@mui/material';
import './match-corresponding.css';
import { updateQuestion, createQuestion, getTask, updatePointOfTask } from '../../../../api/mentor/taskApi';
import {
  getAllPairAnswer,
  createPairAnswer,
  handleUpdateAnswer,
  deletePairAnswer,
} from '../../../../api/mentor/MatchCorrespondingApi';

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

function MatchCorresponding(props: any) {
  const { task } = props;
  const [pairAnswers, setPairAnswers] = React.useState<MatchCorrespondingPairAnswer[]>([]);
  const [question, setQuestion] = React.useState('');
  const [quiz, setQuiz] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [point, setPoint] = React.useState(0);

  const fetchTask = async (id: number) => {
    setIsLoading(true);
    const result = await getTask(task.checklistId, id);
    setQuiz(result?.quiz?.question);
    setPoint(result?.point);
    setQuestion(result?.quiz?.question);
    setIsLoading(false);
  };

  const fecthPairAnswers = async () => {
    const result = await getAllPairAnswer(task.id);
    setPairAnswers(result || []);
  };

  React.useEffect(() => {
    fecthPairAnswers();
    fetchTask(task.id);
    return () => setPairAnswers([]);
  }, [task.id]);

  const addNewOption = () => {
    const handleAddEmptyChoice = async () => {
      const result = await createPairAnswer(task.id);
      if (result) {
        fecthPairAnswers();
      }
      message.success('Created', 0.5);
    };
    handleAddEmptyChoice();
  };

  const handleUpdateQuestion = (taskId: number) => {
    const handleUpdate = async () => {
      await updateQuestion(taskId, question);
      message.success('Updated', 0.5);
    };
    const handlecreate = async () => {
      await createQuestion(taskId, question);
      message.success('Updated', 0.5);
    };
    if (quiz === undefined) {
      handlecreate();
    } else {
      handleUpdate();
    }
  };

  const handleUpdatePoint = (checklistId: number, taskId: number) => {
    const handleUpdate = async () => {
      await updatePointOfTask(checklistId, taskId, point);
      message.success('Updated', 0.5);
    };
    handleUpdate();
  };

  const handleChangeFirstAnswer = (pairAnswerId: number, content: string) => {
    const newPairAnswers = [...pairAnswers];
    const index = newPairAnswers.findIndex((pairAnswer) => pairAnswer.id === pairAnswerId);
    newPairAnswers[index].firstAnswer.content = content;
    setPairAnswers(newPairAnswers);
  };

  const handleChangeSecondAnswer = (pairAnswerId: number, content: string) => {
    const newPairAnswers = [...pairAnswers];
    const index = newPairAnswers.findIndex((pairAnswer) => pairAnswer.id === pairAnswerId);
    newPairAnswers[index].secondAnswer.content = content;
    setPairAnswers(newPairAnswers);
  };

  const updateAnswer = (answerId: number, content: string) => {
    const handleUpdate = async () => {
      await handleUpdateAnswer(task.id, answerId, content);
      fecthPairAnswers();
      message.success('Updated', 0.5);
    };
    handleUpdate();
  };

  const handleRemovePairAnswer = (pairAnswerId: number) => {
    const handleRemove = async () => {
      await deletePairAnswer(task.id, pairAnswerId);
      fecthPairAnswers();
      message.success('Removed', 0.5);
    };
    handleRemove();
  };

  return (
    <div className="match-corresponding-main">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="match-corresponding">
          <InputBase
            multiline
            maxRows={10}
            sx={{
              width: '100%',
              fontSize: '24px',
              fontWeight: 'bold',
              marginTop: '20px',
            }}
            placeholder="Untitled"
            value={question || ''}
            onChange={(e) => setQuestion(e.target.value)}
            onBlur={() => handleUpdateQuestion(task.id)}
          />
          <div className="task-point">
            <div className="task-point-title">Point:</div>
            <InputBase
              type="number"
              sx={{
                width: '100px',
                padding: '0 5px',
                fontSize: '18px',
                border: '1px solid #ccc',
              }}
              value={point ? point : 0}
              onChange={(e) => setPoint(Number(e.target.value))}
              onBlur={() => handleUpdatePoint(task.checklistId, task.id)}
            />
          </div>
          <div className="answer">
            <div className="pair-answers">
              {pairAnswers.map((pairAnswer: MatchCorrespondingPairAnswer) => {
                return (
                  <div className="pair-answer" key={pairAnswer.id}>
                    <div className="pair-answer-first">
                      <InputBase
                        className="input-base"
                        multiline
                        maxRows={10}
                        placeholder="Enter an answer here"
                        value={pairAnswer.firstAnswer.content || ''}
                        onChange={(e) => handleChangeFirstAnswer(pairAnswer.id, e.target.value)}
                        onBlur={(e) => updateAnswer(pairAnswer.firstAnswer.id, e.target.value)}
                      />
                    </div>
                    <div className="between">
                      <div className="between__container"></div>
                      <div className="between__circle"></div>
                    </div>
                    <div className="pair-answer-second">
                      <InputBase
                        className="input-base"
                        multiline
                        maxRows={10}
                        placeholder="Enter corresponding answer here"
                        value={pairAnswer.secondAnswer.content || ''}
                        onChange={(e) => handleChangeSecondAnswer(pairAnswer.id, e.target.value)}
                        onBlur={(e) => updateAnswer(pairAnswer.secondAnswer.id, e.target.value)}
                      />
                    </div>
                    <div className="remove-btn">
                      <MinusCircleOutlined
                        className="remove-icon"
                        style={{ fontSize: '25px', color: 'gray' }}
                        onClick={() => handleRemovePairAnswer(pairAnswer.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <Button className="add-new-choice" onClick={addNewOption} disabled={pairAnswers.length >= 5}>
              Add an option
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchCorresponding;
