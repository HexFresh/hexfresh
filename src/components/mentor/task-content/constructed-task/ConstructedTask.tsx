import React from 'react';
import InputBase from '@mui/material/InputBase';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import {
  updateQuestion,
  createQuestion,
  getTask,
  updatePointOfTask,
} from '../../../../api/mentor/taskApi';
import {
  getAnswer,
  createEmptyAnswer,
  deleteAnswer,
  updateAnswer,
} from '../../../../api/mentor/ConstructedTaskApi';
import { CircularProgress } from '@mui/material';
import './constructed-task.css';

interface ConstructedAnswer {
  id: number;
  taskId: number;
  sampleAnswer: string;
  isMatchingRequired: boolean;
}

function ConstructedTask(props: any) {
  const { task } = props;
  const [answer, setAnswer] = React.useState<ConstructedAnswer>({
    id: 0,
    taskId: 0,
    sampleAnswer: '',
    isMatchingRequired: false,
  });
  const [question, setQuestion] = React.useState('');
  const [quiz, setQuiz] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [point, setPoint] = React.useState(0);
  const [isMatchingRequired, setIsMatchingRequired] = React.useState();

  const fetchTask = async (id: number) => {
    setIsLoading(true);
    const result = await getTask(task.checklistId, id);
    setQuiz(result?.quiz?.question);
    setPoint(result?.point);
    setQuestion(result?.quiz?.question);
    setIsLoading(false);
  };

  const fecthAnswers = async (id: number) => {
    const result = await getAnswer(id);
    setAnswer(
      result || {
        id: 0,
        taskId: 0,
        sampleAnswer: '',
        isMatchingRequired: false,
      }
    );
    setIsMatchingRequired(result?.isMatchingRequired);
    setIsLoading(false);
  };

  React.useEffect(() => {
    let controller = new AbortController();
    setAnswer({
      id: 0,
      taskId: 0,
      sampleAnswer: '',
      isMatchingRequired: false,
    });
    fecthAnswers(task.id);
    fetchTask(task.id);
    return () => controller?.abort();
  }, [task.id]);

  const handleSampleAnswerChange = (newSampleAnswer: string) => {
    setAnswer({
      ...answer,
      sampleAnswer: newSampleAnswer,
    });
  };

  const handleUpdateSampleAnswer = (newSampleAnswer: string) => {
    const handleUpdate = async () => {
      await updateAnswer(task.id, answer.id, {
        sampleAnswer: newSampleAnswer,
      });
    };
    handleUpdate();
  };

  const handleRemoveAnswer = () => {
    const handleRemove = async () => {
      await deleteAnswer(task.id, answer.id);
      setAnswer({
        id: 0,
        taskId: 0,
        sampleAnswer: '',
        isMatchingRequired: false,
      });
      fecthAnswers(task.id);
    };
    handleRemove();
  };

  const addNewAnswer = () => {
    const handleAddEmptyAnswer = async () => {
      const result = await createEmptyAnswer(task.id);
      if (result) {
        fecthAnswers(task.id);
      }
    };
    handleAddEmptyAnswer();
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

  function onCheckboxChange(e: any) {
    const checked = e.target.checked;
    setIsMatchingRequired(checked);
    const update = async () => {
      await updateAnswer(task.id, answer.id, {
        isMatchingRequired: checked ? true : '0',
      });
    };
    update();
  }

  return (
    <div className="constructed-task-main">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="constructed-task">
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
            {answer.id === 0 ? (
              <></>
            ) : (
              <div className="answer-item">
                <div className="answer-item-content">
                  <InputBase
                    className="input-base"
                    multiline
                    maxRows={12}
                    sx={{ width: '100%', fontSize: '18px' }}
                    value={answer.sampleAnswer || ''}
                    onChange={(e) => handleSampleAnswerChange(e.target.value)}
                    onBlur={(e) => handleUpdateSampleAnswer(e.target.value)}
                    placeholder="Fill answer"
                  />
                </div>
                <MinusCircleOutlined
                  className="remove-choice-btn"
                  style={{ fontSize: '25px', color: 'gray' }}
                  onClick={handleRemoveAnswer}
                />
              </div>
            )}
            <Checkbox
              className="checkbox"
              onChange={onCheckboxChange}
              checked={isMatchingRequired}
            >
              Matching Required
            </Checkbox>
            <div className="add-new-choice">
              <Button
                onClick={addNewAnswer}
                style={{ width: '100%', borderRadius: '5px' }}
                disabled={answer.id !== 0}
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

export default ConstructedTask;
