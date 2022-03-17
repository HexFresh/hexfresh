import React from 'react';
import InputBase from '@mui/material/InputBase';
import {
  CheckSquareOutlined,
  BorderOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';

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

function MultipleChoiceTask(props: any) {
  const { task } = props;
  const [choices, setChoices] = React.useState<SelectedQuestionChoice[]>([]);

  React.useEffect(() => {
    setChoices(data);
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
        value={task.title}
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
                style={{ fontSize: '30px', color: 'gray' }}
                onClick={() => handleRemoveChoice(choice.id)}
              />
              {choice.isRight ? (
                <CheckSquareOutlined
                  style={{ fontSize: '30px', color: 'green' }}
                  onClick={() => handleIsRightChange(choice.id)}
                />
              ) : (
                <BorderOutlined
                  style={{ fontSize: '30px', color: 'gray' }}
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
    </div>
  );
}

export default MultipleChoiceTask;
