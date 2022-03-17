import React from 'react';
import { Menu } from 'antd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './phase-detail.css';
import { useParams } from 'react-router-dom';
import TaskContent from '../../components/mentor/task-content/TaskContent';
import { Modal, Input, Select, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

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

interface IChecklist {
  id: number;
  phaseId: number;
  index: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  tasks: ITask[];
}

const data = [
  {
    id: 1,
    phaseId: 1,
    index: 1,
    title: 'Checklist 1',
    isCompleted: false,
    isActive: true,
    tasks: [
      {
        id: 2,
        checklistId: 1,
        typeId: 1,
        title: 'Task 1',
        index: 1,
        point: 1,
        isCompleted: false,
        isChecked: false,
        isActive: true,
      },
      {
        id: 3,
        checklistId: 1,
        typeId: 2,
        title: 'Task 2',
        index: 2,
        point: 1,
        isCompleted: false,
        isChecked: false,
        isActive: true,
      },
    ],
  },
];

const { SubMenu } = Menu;

function PhaseDetail() {
  const [checklists, setChecklists] = React.useState<IChecklist[]>([]);
  const [task, setTask] = React.useState<ITask | null>(null);
  const [checklistId, setChecklistId] = React.useState<number>(0);
  const [isTaskModalVisible, setIsTaskModalVisible] = React.useState(false);
  const [isChecklistModalVisible, setIsChecklistModalVisible] =
    React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState<string>('');
  const [taskType, setTaskType] = React.useState<string>('1');
  const [checklistTitle, setChecklistTitle] = React.useState<string>('');

  const phaseId = useParams().phaseId;

  React.useEffect(() => {
    setChecklists(data);
  }, []);

  const showTaskModal = (checklistId: number) => {
    setIsTaskModalVisible(true);
    setChecklistId(checklistId);
  };

  const showChecklistModal = () => {
    setIsChecklistModalVisible(true);
  };

  const handleTaskOk = () => {
    if (taskTitle.length > 0) {
      setIsTaskModalVisible(false);
      const newTask = {
        id: Math.random() * 1000000,
        checklistId,
        typeId: Number(taskType),
        title: taskTitle,
        index: Math.random() * 1000000,
        point: 1,
        isCompleted: false,
        isChecked: false,
        isActive: true,
      };
      setChecklists(
        checklists.map((checklist: IChecklist) => {
          if (checklist.id === checklistId) {
            checklist.tasks.push(newTask);
          }
          return checklist;
        })
      );
      setTaskTitle('');
      setTaskType('1');
    }
  };

  const handleChecklistOk = () => {
    if (checklistTitle.length > 0) {
      setIsChecklistModalVisible(false);
      const newChecklist = {
        id: Math.random() * 1000000,
        phaseId: Number(phaseId),
        index: Math.random() * 1000000,
        title: checklistTitle,
        isCompleted: false,
        isActive: true,
        tasks: [],
      };
      setChecklists([...checklists, newChecklist]);

      setChecklistTitle('');
    }
  };

  const handleTaskCancel = () => {
    setIsTaskModalVisible(false);
  };

  const handleChecklistCancel = () => {
    setIsChecklistModalVisible(false);
  };

  const changeTaskTitle = (e: any) => {
    setTaskTitle(e.target.value);
  };

  const changeTaskType = (value: any) => {
    setTaskType(value);
  };

  return (
    <div className="phase-detail">
      <div className="container">
        <div className="sider">
          <div className="menu">
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
              {checklists.map((checklist) => {
                return (
                  <SubMenu
                    key={checklist.id}
                    title={<span>{checklist.title}</span>}
                  >
                    {checklist.tasks.map((task) => {
                      return (
                        <Menu.Item key={task.id} onClick={() => setTask(task)}>
                          <div className="task">
                            <div className="task-title">{task.title}</div>
                          </div>
                        </Menu.Item>
                      );
                    })}

                    <div key="add-btn" className="add-btn">
                      <Button
                        type="primary"
                        onClick={() => showTaskModal(checklist.id)}
                        className="add-task-btn"
                        icon={<PlusCircleOutlined />}
                      >
                        Add Task
                      </Button>
                    </div>
                  </SubMenu>
                );
              })}
            </Menu>
          </div>
          <div className="add-btn">
            <Button
              type="primary"
              onClick={showChecklistModal}
              className="add-checklist-btn"
              icon={<PlusCircleOutlined />}
            >
              Add Checklist
            </Button>
          </div>
        </div>
        <div className="page-content">
          {task ? (
            <TaskContent task={task} />
          ) : (
            <div className="no-task">
              <p>No Task Selected</p>
            </div>
          )}
        </div>
      </div>
      <Modal
        className="task modal"
        title="Create new task"
        visible={isTaskModalVisible}
        onOk={handleTaskOk}
        onCancel={handleTaskCancel}
        footer={[
          <Button style={{ marginRight: '10px' }} onClick={handleTaskCancel}>
            Cancel
          </Button>,
          <Button type="primary" onClick={handleTaskOk}>
            Create
          </Button>,
        ]}
      >
        <div className="form">
          <div className="field">
            <label>Title</label>
            <Input value={taskTitle} onChange={changeTaskTitle} />
          </div>
          <div className="field">
            <label>Choose type of task</label>
            <Select
              value={taskType}
              style={{ width: '100%' }}
              onChange={changeTaskType}
            >
              <Option value="1">Selected-Response Question</Option>
              <Option value="2">Constructed-Response Question</Option>
              <Option value="3">True-False Question</Option>
              <Option value="4">Match Sequence</Option>
              <Option value="5">Match Correcsponding</Option>
              <Option value="6">Document</Option>
              <Option value="7">Assignment</Option>
            </Select>
          </div>
        </div>
      </Modal>
      <Modal
        className="checklist-modal"
        title="Create new checklist"
        visible={isChecklistModalVisible}
        onOk={handleChecklistOk}
        onCancel={handleChecklistCancel}
        footer={[
          <Button
            style={{ marginRight: '10px' }}
            onClick={handleChecklistCancel}
          >
            Cancel
          </Button>,
          <Button type="primary" onClick={handleChecklistOk}>
            Create
          </Button>,
        ]}
      >
        <div className="form">
          <div className="field">
            <label>Title</label>
            <Input
              value={checklistTitle}
              onChange={(e) => setChecklistTitle(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PhaseDetail;
