import React from 'react';
import InputBase from '@mui/material/InputBase';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { updateQuestion, createQuestion, getTask, updatePointOfTask } from '../../../../api/mentor/taskApi';
import { CircularProgress } from '@mui/material';
import './match-corresponding.css';

interface MatchCorrespondingOption {
  id: number;
  taskId: number;
  content: string;
  index: number;
}

function MatchCorresponding(props: any) {
  const { task } = props;
  const [options, setOptions] = React.useState<MatchCorrespondingOption[]>([]);
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

  const fecthOptions = async () => {
    console.log('Fetch Match Sequence Options');
    // const result = await getAllOption(task.id);
    // setOptions(result || []);
  };

  React.useEffect(() => {
    fecthOptions();
    fetchTask(task.id);
    return () => setOptions([]);
  }, [task.id]);

  const addNewOption = () => {
    // const handleAddEmptyChoice = async () => {
    //   const result = await createOption(task.id);
    //   if (result) {
    //     fecthOptions();
    //   }
    //   message.success('Created', 0.5);
    // };
    // handleAddEmptyChoice();
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

  const updateOptions = (options: MatchCorrespondingOption[]) => {
    // const handleUpdate = async () => {
    //   await updateBulkOption(task.id, options);
    //   fecthOptions();
    //   message.success('Updated', 0.5);
    // };
    // handleUpdate();
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
              fontSize: '20px',
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
            <div className="add-new-choice">
              <Button
                onClick={addNewOption}
                style={{ width: '100%', borderRadius: '5px' }}
                disabled={options.length >= 5}
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

export default MatchCorresponding;
