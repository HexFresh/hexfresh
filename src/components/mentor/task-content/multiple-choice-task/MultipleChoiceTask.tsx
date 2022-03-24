import React from 'react';
import InputBase from '@mui/material/InputBase';
import {
  CheckSquareOutlined,
  BorderOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, message } from 'antd';
import {
  updateQuestion,
  createQuestion,
  getTask,
  updatePointOfTask,
} from '../../../../api/mentor/taskApi';
import {
  getChoicesWithAnswer,
  updateChoice,
  addEmptyChoice,
  deleteChoice,
} from '../../../../api/mentor/SelectedChoiceTaskApi';
import { CircularProgress } from '@mui/material';
import './multiple-choice-task.css';

interface SelectedQuestionChoice {
  id: number;
  taskId: number;
  content: string;
  isRight: boolean;
}

function MultipleChoiceTask(props: any) {
  const { task } = props;
  const [choices, setChoices] = React.useState<SelectedQuestionChoice[]>([]);
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

  const fecthChoices = async (id: number) => {
    const result = await getChoicesWithAnswer(id);
    setChoices(result || []);
  };

  React.useEffect(() => {
    let controller = new AbortController();
    fecthChoices(task.id);
    fetchTask(task.id);
    return () => controller?.abort();
  }, [task.id]);

  const handleIsRightChange = (choice: SelectedQuestionChoice) => {
    const handleUpdate = async () => {
      await updateChoice(task.id, choice.id, {
        isRight: choice.isRight === true ? '0' : true,
      });
      fecthChoices(task.id);
    };
    handleUpdate();
  };

  const handleContentChange = (id: number, content: string) => {
    const newChoices = [...choices];
    const index = newChoices.findIndex((c) => c.id === id);
    newChoices[index].content = content;

    setChoices(newChoices);
  };

  const handleUpdate = (
    choiceId: number,
    newContent: string,
    isRight: boolean
  ) => {
    const newIsRight = isRight === null || isRight === false ? false : true;

    const handleUpdate = async () => {
      await updateChoice(task.id, choiceId, {
        content: newContent,
        isRight: newIsRight,
      });
    };
    handleUpdate();
  };

  const handleRemoveChoice = (id: number) => {
    const handleRemove = async () => {
      await deleteChoice(task.id, id);
      fecthChoices(task.id);
    };
    handleRemove();
  };

  const addNewChoice = () => {
    const handleAddEmptyChoice = async () => {
      const result = await addEmptyChoice(task.id);
      if (result) {
        fecthChoices(task.id);
      }
    };
    handleAddEmptyChoice();
  };

  const handleUpdateQuestion = (taskId: number) => {
    const handleUpdate = async () => {
      await updateQuestion(taskId, question);
    };
    const handlecreate = async () => {
      await createQuestion(taskId, question);
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
    };
    handleUpdate();
  };

  return (
    <div className="multiple-choice-task-main">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="multiple-choice-task">
          <InputBase
            multiline
            maxRows={10}
            sx={{ width: '100%', fontSize: '30px', fontWeight: 'bold' }}
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
                padding: '5px',
                fontSize: '20px',
                border: '1px solid #ccc',
              }}
              value={point ? point : 0}
              onChange={(e) => setPoint(Number(e.target.value))}
              onBlur={() => handleUpdatePoint(task.checklistId, task.id)}
            />
          </div>
          <div className="answer">
            {choices.map((choice: SelectedQuestionChoice) => {
              return (
                <div key={choice.id} className="answer-item">
                  <div className="answer-item-content">
                    <InputBase
                      className="input-base"
                      multiline
                      maxRows={10}
                      sx={{ width: '100%', fontSize: '18px' }}
                      value={choice.content || ''}
                      onChange={(e) =>
                        handleContentChange(choice.id, e.target.value)
                      }
                      onBlur={(e) =>
                        handleUpdate(choice.id, e.target.value, choice.isRight)
                      }
                      placeholder="Fill answer"
                    />
                  </div>
                  <MinusCircleOutlined
                    className="remove-choice-btn"
                    style={{ fontSize: '25px', color: 'gray' }}
                    onClick={() => handleRemoveChoice(choice.id)}
                  />
                  {choice.isRight ? (
                    <CheckSquareOutlined
                      style={{ fontSize: '25px', color: 'green' }}
                      onClick={() => handleIsRightChange(choice)}
                    />
                  ) : (
                    <BorderOutlined
                      style={{ fontSize: '25px', color: 'gray' }}
                      onClick={() => handleIsRightChange(choice)}
                    />
                  )}
                </div>
              );
            })}
            <div className="add-new-choice">
              <Button
                onClick={addNewChoice}
                style={{ width: '100%', borderRadius: '5px' }}
                disabled={choices.length >= 5}
              >
                <PlusOutlined />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultipleChoiceTask;
