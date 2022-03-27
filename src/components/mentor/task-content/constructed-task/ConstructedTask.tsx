import React from 'react';
import InputBase from '@mui/material/InputBase';
import { message } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
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
  const [answer, setAnswer] = React.useState<ConstructedAnswer | null>(null);
  const [question, setQuestion] = React.useState('');
  const [quiz, setQuiz] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [point, setPoint] = React.useState(0);
  const [isMatchingRequired, setIsMatchingRequired] = React.useState();

  console.log({ answer, taskName: task.title });

  const fetchTask = async (id: number) => {
    setIsLoading(true);
    const result = await getTask(task.checklistId, id);
    setQuiz(result?.quiz?.question);
    setPoint(result?.point);
    setQuestion(result?.quiz?.question);
    setIsLoading(false);
  };

  const fecthAnswers = async () => {
    const result = await getAnswer(task.id);
    const real = result || null;
    if (real !== null) {
      setAnswer(real);
      setIsMatchingRequired(real.isMatchingRequired);
    } else {
      await addNewAnswer();
      fecthAnswers();
    }
  };

  React.useEffect(() => {
    fetchTask(task.id);
    fecthAnswers();
    return () => setAnswer(null);
  }, [task.id]);

  const addNewAnswer = () => {
    const handleAddEmptyAnswer = async () => {
      await createEmptyAnswer(task.id);
    };
    handleAddEmptyAnswer();
  };

  const handleSampleAnswerChange = (newSampleAnswer: string) => {
    setAnswer({
      ...answer,
      sampleAnswer: newSampleAnswer,
    } as ConstructedAnswer);
  };

  const handleUpdateSampleAnswer = (newSampleAnswer: string) => {
    if (answer) {
      if (newSampleAnswer === '') {
        newSampleAnswer = ' ';
      }
      const handleUpdate = async () => {
        await updateAnswer(task.id, answer.id, {
          sampleAnswer: newSampleAnswer,
        });
        fecthAnswers();
        message.success('Updated', 0.5);
      };
      handleUpdate();
    }
  };

  const handleRemoveAnswer = () => {
    if (answer) {
      handleUpdateSampleAnswer('');
      const update = async () => {
        await updateAnswer(task.id, answer.id, {
          isMatchingRequired: '0',
        });
      };
      update();
    }
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

  function onCheckboxChange(e: any) {
    if (answer) {
      const checked = e.target.checked;
      setIsMatchingRequired(checked);
      const update = async () => {
        await updateAnswer(task.id, answer.id, {
          isMatchingRequired: checked ? true : '0',
        });
        message.success('Updated', 0.5);
      };
      update();
    }
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
            <div className="answer-item">
              <div className="answer-item-content">
                <InputBase
                  className="input-base"
                  multiline
                  maxRows={12}
                  sx={{ width: '100%', fontSize: '18px' }}
                  value={
                    (answer?.sampleAnswer === ' '
                      ? ''
                      : answer?.sampleAnswer) || ''
                  }
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
            <Checkbox
              className="checkbox"
              onChange={onCheckboxChange}
              checked={isMatchingRequired}
            >
              Matching Required
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConstructedTask;
