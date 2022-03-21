import React from 'react';
import './task-content.css';
import MultipleChoiceTask from './multiple-choice-task/MultipleChoiceTask';
import TrueFalseTask from './true-false-task/TrueFalseTask';

interface ITask {
  id: number;
  checklistId: number;
  typeId: number;
  title: string;
  index: number;
  point: number;
  isCompleted: boolean;
  isChecked: boolean;
  isActive: boolean;
}

function TaskContent(props: any) {
  const { task } = props;

  const renderTask = (task: ITask) => {
    switch (task.typeId) {
      case 1:
        return <MultipleChoiceTask task={task} />;
      case 3:
        return <TrueFalseTask task={task} />;
      default:
        return <div className="task-content-title">Chưa làm</div>;
    }
  };

  return (
    <div className="task-content">
      <div className="task-content-container">
        <div className="top">{task.title}</div>
        <div className="bottom">{renderTask(task)}</div>
      </div>
    </div>
  );
}

export default TaskContent;
