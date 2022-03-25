import React, { useEffect } from 'react';
import './task-content.css';
import SingleChoiceTask from './single-choice-task/SingleChoiceTask';
import MultipleChoiceTask from './multiple-choice-task/MultipleChoiceTask';
import ConstructedTask from './constructed-task/ConstructedTask';
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
  const [renderTask, setRenderTask] = React.useState<JSX.Element | null>(null);

  useEffect(() => {
    switch (task.typeId) {
      case 1:
        setRenderTask(<SingleChoiceTask task={task} />);
        break;
      case 2:
        setRenderTask(<MultipleChoiceTask task={task} />);
        break;
      case 3:
        setRenderTask(<ConstructedTask task={task} />);
        break;
      case 4:
        setRenderTask(<TrueFalseTask task={task} />);
        break;
      default:
        setRenderTask(null);
        break;
    }
    return () => setRenderTask(null);
  }, [task.id]);

  return (
    <div className="task-content">
      <div className="task-content-container">
        <div className="top">{task.title}</div>
        <div className="bottom">{renderTask}</div>
      </div>
    </div>
  );
}

export default TaskContent;
