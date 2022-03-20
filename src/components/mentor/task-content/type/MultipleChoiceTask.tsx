import React from 'react';
import InputBase from '@mui/material/InputBase';
import {
  CheckSquareOutlined,
  BorderOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, message } from 'antd';

const key = 'updatable';

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
  const [point, setPoint] = React.useState(0);

  const openMessage = (content: string) => {
    message.loading({ content, key });
    setTimeout(() => {
      message.success({ content: 'Saved!', key, duration: 2 });
    }, 1000);
  };

  React.useEffect(() => {
    // setChoices(data);
    // get question (/:taskId/quiz)
    setPoint(task.point);
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
    newChoices.splice(index, 1);
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

  const handleUpdateQuestion = (taskId: number) => {
    openMessage('Saving...');
    // if '' => create new question
    // else update question
    console.log({ taskId, question });
  };

  const handleUpdatePoint = (taskId: number) => {
    openMessage('Saving...');
    console.log({ checklistId: task.checklistId, taskId, point });
  };

  const handleUpdateContent = (choiceId: number, newContent: string) => {
    openMessage('Saving...');
    console.log({ taskId: task.id, choiceId, newContent });
  };

  return (
    <div className="multiple-choice-task">
      <InputBase
        multiline
        maxRows={10}
        sx={{ width: '100%', fontSize: '30px', fontWeight: 'bold' }}
        placeholder="Untitled"
        value={question}
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
          value={point}
          onChange={(e) => setPoint(Number(e.target.value))}
          onBlur={() => handleUpdatePoint(task.id)}
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
                  value={choice.content}
                  onChange={(e) =>
                    handleContentChange(choice.id, e.target.value)
                  }
                  onBlur={(e) => handleUpdateContent(choice.id, e.target.value)}
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
            style={{ width: '100%', borderRadius: '5px' }}
            disabled={choices.length >= 5}
          >
            <PlusOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MultipleChoiceTask;
