import React from 'react';
import InputBase from '@mui/material/InputBase';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {
  updateQuestion,
  createQuestion,
  getTask,
  updatePointOfTask,
} from '../../../../api/mentor/taskApi';
import {
  getAllOptionsWithAnswer,
  addEmptyOption,
} from '../../../../api/mentor/TrueFalseTaskApi';
import { CircularProgress } from '@mui/material';
import './true-false-task.css';
import TrueFalseChoice from './TrueFalseChoice';

interface TrueFalseOption {
  id: number;
  taskId: number;
  content: string;
  isRight: boolean;
}

function TrueFalseTask(props: any) {
  const { task } = props;
  const [options, setOptions] = React.useState<TrueFalseOption[]>([]);
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

  const fecthOptions = async (id: number) => {
    setIsLoading(true);
    const result = await getAllOptionsWithAnswer(id);
    setOptions(result || []);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fecthOptions(task.id);
    fetchTask(task.id);
    return () => setOptions([]);
  }, [task.id]);

  const addNewOption = () => {
    const handleAddEmptyChoice = async () => {
      const result = await addEmptyOption(task.id);
      if (result) {
        fecthOptions(task.id);
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
    <div className="true-false-task-main">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="true-false-task">
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
          <div className="choices">
            {options.map((option: any, index: number) => {
              return (
                <TrueFalseChoice
                  resetOptions={() => fecthOptions(task.id)}
                  taskId={task.id}
                  option={option}
                  key={index}
                />
              );
            })}
          </div>
          <div className="add-new-choice">
            <Button
              onClick={addNewOption}
              style={{
                width: '100%',
                borderRadius: '5px',
                marginBottom: '20px',
              }}
              disabled={options.length >= 5}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrueFalseTask;
