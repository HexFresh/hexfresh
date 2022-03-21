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
import './true-false-task.css';

function MultipleChoiceTask(props: any) {
  return (
    <div className="multiple-choice-task">
      <div className="multiple-choice-task-container"></div>
    </div>
  );
}

export default MultipleChoiceTask;
