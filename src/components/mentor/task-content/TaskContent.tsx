import React, { useEffect } from 'react';
import './task-content.css';
import { Menu, Dropdown, Button, Popconfirm, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { deleteTask } from '../../../api/mentor/taskApi';
import SingleChoiceTask from './single-choice-task/SingleChoiceTask';
import MultipleChoiceTask from './multiple-choice-task/MultipleChoiceTask';
import ConstructedTask from './constructed-task/ConstructedTask';
import TrueFalseTask from './true-false-task/TrueFalseTask';
import MatchSequence from './match-sequence/MatchSequence';
import DocumentTask from './document-task/DocumentTask';
import MatchCorresponding from './match-corresponding/MatchCorresponding';

function TaskContent(props: any) {
  const { task, fetchChecklists, setTaskNull } = props;
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
      case 5:
        setRenderTask(<MatchSequence task={task} />);
        break;
      case 6:
        setRenderTask(<MatchCorresponding task={task} />);
        break;
      case 7:
        setRenderTask(<DocumentTask task={task} />);
        break;
      default:
        setRenderTask(null);
        break;
    }
    return () => setRenderTask(null);
  }, [task.id]);

  const renderType = () => {
    switch (task.typeId) {
      case 1:
        return <div className="task-type">Single Choice</div>;
      case 2:
        return <div className="task-type">Multiple Choice</div>;
      case 3:
        return <div className="task-type">Constructed-Response</div>;
      case 4:
        return <div className="task-type">True-False</div>;
      case 5:
        return <div className="task-type">Match Sequence</div>;
      case 6:
        return <div className="task-type">Match Corresponding</div>;
      case 7:
        return <div className="task-type">Document</div>;
      default:
        return <div className="task-type">Chưa làm</div>;
    }
  };

  const handleDeleteTask = async () => {
    const result = await deleteTask(task.checklistId, task.id);
    if (result === '') {
      message.success('Delete task success');
      fetchChecklists();
      setTaskNull();
    } else {
      message.error('Delete failed');
    }
  };

  return (
    <div className="task-content">
      <div className="task-content-container">
        <div className="top">
          {renderType()}
          <div className="task-title">{task.title}</div>
          <div className="remove-task-btn">
            <Dropdown
              overlay={
                <Menu>
                  <Popconfirm
                    placement="topLeft"
                    title="Are you sure to delete this task?"
                    okText="Yes"
                    onConfirm={handleDeleteTask}
                    cancelText="No"
                  >
                    <Menu.Item key="1">Remove task</Menu.Item>
                  </Popconfirm>
                  <Menu.Item key="2">Add to Resource</Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              arrow
            >
              <Button shape="circle" icon={<EllipsisOutlined />} />
            </Dropdown>
          </div>
        </div>
        <div className="bottom">{renderTask}</div>
      </div>
    </div>
  );
}

export default TaskContent;
