import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import InputBase from '@mui/material/InputBase';
import {
  deleteOption,
  updateOption,
} from '../../../../api/mentor/TrueFalseTaskApi';
import { MinusCircleOutlined } from '@ant-design/icons';
import './true-false-task.css';

function TrueFalseChoice(props: any) {
  const { option, taskId, resetOptions } = props;
  const [currentOption, setCurrentOption] = useState(option);

  useEffect(() => {
    setCurrentOption(option);
  }, []);

  const updateTrue = async () => {
    if (currentOption.isRight) {
      return;
    }
    await updateOption(taskId, option.id, {
      isRight: true,
    });
    message.success('Updated', 0.5);
    setCurrentOption({ ...currentOption, isRight: true });
  };

  const updateFalse = async () => {
    if (currentOption.isRight === false) {
      return;
    }
    await updateOption(taskId, option.id, {
      isRight: '0',
    });

    message.success('Updated', 0.5);
    setCurrentOption({ ...currentOption, isRight: false });
  };

  const handleUpdateContent = async (e: any) => {
    await updateOption(taskId, option.id, {
      content: e.target.value,
    });
    message.success('Updated', 0.5);
  };

  const handleRemoveOption = async () => {
    console.log({ taskId, option });
    await deleteOption(taskId, option.id);
    message.success('Deleted', 0.5);
    resetOptions();
  };

  return (
    <div className="true-false-option">
      <div className="choice-option">
        <InputBase
          className="input-base"
          multiline
          maxRows={10}
          sx={{ width: '100%', fontSize: '18px' }}
          defaultValue={currentOption.content || ''}
          placeholder="Fill option"
          onBlur={handleUpdateContent}
        />
      </div>

      <div className="true-false-btn">
        <div
          onClick={updateTrue}
          className={
            currentOption.isRight === true ? 'true-btn active' : 'true-btn'
          }
        >
          True
        </div>
        <div
          onClick={updateFalse}
          className={
            currentOption.isRight === false ? 'false-btn active' : 'false-btn'
          }
        >
          False
        </div>
      </div>
      <MinusCircleOutlined
        className="remove-option-btn"
        style={{ fontSize: '25px', color: 'gray' }}
        onClick={handleRemoveOption}
      />
    </div>
  );
}

export default TrueFalseChoice;
