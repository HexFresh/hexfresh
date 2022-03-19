import React from 'react';
import InputBase from '@mui/material/InputBase';
import {
  CheckSquareOutlined,
  BorderOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Delete from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';

interface SelectedQuestionChoice {
  id: number;
  taskId: number;
  content: string;
  isRight: boolean;
}

const data = [
  {
    id: 1,
    taskId: 1,
    content: 'Content 1',
    isRight: false,
  },
  {
    id: 2,
    taskId: 1,
    content: 'Content 2',
    isRight: false,
  },
  {
    id: 3,
    taskId: 1,
    content: 'Content 3',
    isRight: true,
  },
];

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function MultipleChoiceTask(props: any) {
  const { task } = props;
  const [choices, setChoices] = React.useState<SelectedQuestionChoice[]>([]);

  React.useEffect(() => {
    // setChoices(data);
  }, []);

  const handleIsRightChange = (id: number) => {
    const newChoices = [...choices];
    const index = newChoices.findIndex((c) => c.id === id);
    newChoices[index].isRight = !newChoices[index].isRight;
    setChoices(newChoices);
  };

  const handleContentChange = (id: number, content: string) => {
    const newChoices = [...choices];
    const index = newChoices.findIndex((c) => c.id === id);
    newChoices[index].content = content;

    setChoices(newChoices);
  };

  const handleRemoveChoice = (id: number) => {
    const newChoices = [...choices];
    const index = newChoices.findIndex((c) => c.id === id);
    const temp = newChoices.splice(index, 1);
    console.log(newChoices);
    setChoices(newChoices);
  };

  const addNewChoice = () => {
    if (choices.length < 5) {
      const newChoice = {
        id: choices.length + 1,
        taskId: task.id,
        content: '',
        isRight: false,
      };
      setChoices([...choices, newChoice]);
    }
  };

  return (
    <div className="multiple-choice-task">
      <InputBase
        multiline
        maxRows={10}
        sx={{ width: '100%', fontSize: '30px', fontWeight: 'bold' }}
        placeholder="Untitled"
      />
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
                  value={choice.content}
                  onChange={(e) =>
                    handleContentChange(choice.id, e.target.value)
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
                  onClick={() => handleIsRightChange(choice.id)}
                />
              ) : (
                <BorderOutlined
                  style={{ fontSize: '25px', color: 'gray' }}
                  onClick={() => handleIsRightChange(choice.id)}
                />
              )}
            </div>
          );
        })}
        <div className="add-new-choice">
          <Button
            onClick={addNewChoice}
            style={{ width: '100%', borderRadius: '20px' }}
          >
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        direction="down"
      >
        <SpeedDialAction
          key="delete-task"
          icon={<Delete />}
          tooltipTitle="Delete task"
        />
        <SpeedDialAction
          key="save-task"
          icon={<SaveIcon />}
          tooltipTitle="Save task"
        />
      </StyledSpeedDial>
    </div>
  );
}

export default MultipleChoiceTask;
