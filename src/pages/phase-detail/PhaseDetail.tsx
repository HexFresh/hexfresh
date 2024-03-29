import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {HomeOutlined, ApartmentOutlined} from '@ant-design/icons';
import './phase-detail.css';
import {sortByField} from '../../utils/common';
import {useParams} from 'react-router-dom';
import TaskContent from '../../components/mentor/task-content/TaskContent';
import {Menu, Breadcrumb, Modal, Input, Select, Button, message} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {createChecklist, getAllChecklist, createTask, getPhaseById} from '../../api/mentor/mentorApi';
import {CircularProgress} from '@mui/material';

const {Option} = Select;

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

const {SubMenu} = Menu;

function PhaseDetail() {
  const [loading, setLoading] = useState(false);
  const [checklists, setChecklists] = useState<IChecklist[]>([]);
  const [phaseTitle, setPhaseTitle] = useState('');
  const [task, setTask] = useState<ITask | null>(null);
  const [checklistId, setChecklistId] = useState<number>(0);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isChecklistModalVisible, setIsChecklistModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('1');
  const [checklistTitle, setChecklistTitle] = useState<string>('');

  const phaseId = useParams().phaseId;
  const programId = useParams().programId;

  const fetchChecklists = async () => {
    const result = await getAllChecklist(Number(phaseId));
    setChecklists(result);
  };

  const fetchPhaseById = async () => {
    const result = await getPhaseById(Number(programId), Number(phaseId));
    if (result) {
      setPhaseTitle(result.title);
    }
  };

  const setTaskNull = () => {
    setTask(null);
  };

  useEffect(() => {
    document.title = 'HexF - Phase Detail';
    const fetchData = async () => {
      setLoading(true);
      await fetchChecklists();
      await fetchPhaseById();
      setLoading(false);
    };
    fetchData();
    return () => setChecklists([]);
  }, []);

  const renderTask = (task: ITask) => {
    setTask(null);
    setTask(task);
  };

  const showTaskModal = (checklistId: number) => {
    setIsTaskModalVisible(true);
    setChecklistId(checklistId);
  };

  const showChecklistModal = () => {
    setIsChecklistModalVisible(true);
  };

  const findMaxIndexOfChecklist = (checklists: IChecklist[]) => {
    let maxIndex = 0;
    for (const checklist of checklists) {
      if (checklist.index > maxIndex) {
        maxIndex = checklist.index;
      }
    }
    return maxIndex;
  };

  const findMaxIndexOfTask = (tasks: ITask[]) => {
    let maxIndex = 0;
    for (const task of tasks) {
      if (task.index > maxIndex) {
        maxIndex = task.index;
      }
    }
    return maxIndex;
  };

  const handleChecklistOk = () => {
    if (checklistTitle.length > 0) {
      setIsChecklistModalVisible(false);
      const newChecklist = {
        index: findMaxIndexOfChecklist(checklists) + 1,
        title: checklistTitle,
      };

      const handleCreateChecklist = async () => {
        message.loading({content: 'Creating...'}).then(async () => {
          await createChecklist(Number(phaseId), newChecklist);
          fetchChecklists();
          message.success({content: 'Created', key: 'success'});
        });
      };
      handleCreateChecklist();
      setChecklistTitle('');
    }
  };

  const handleTaskOk = () => {
    if (taskTitle.length > 0) {
      const newTask = {
        typeId: Number(taskType),
        title: taskTitle,
        index:
          findMaxIndexOfTask(checklists[checklists.findIndex((checklist) => checklist.id === checklistId)].tasks) + 1,
      };
      const handleCreateTask = async () => {
        message.loading({content: 'Creating...'}).then(async () => {
          await createTask(Number(checklistId), newTask);
          fetchChecklists();
          message.success({content: 'Created', key: 'success'});
          setIsTaskModalVisible(false);
          setTaskTitle('');
          setTaskType('1');
        });
      };
      handleCreateTask();
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
    <div className="phase-detail-main">
      {loading ? (
        <CircularProgress/>
      ) : (
        <div className="phase-detail">
          <div className="topbar">
            <Link className="topbar__left" to="/mentor/programs">
              <img src="/logo.svg" width="36px" alt="logo"/>
            </Link>
            <div className="topbar__mid">{phaseTitle}</div>
            <div className="topbar__right"></div>
          </div>
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/mentor/programs">
                  <HomeOutlined
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  <span>List Program</span>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/mentor/programs/${programId}/phases`}>
                  <ApartmentOutlined
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  <span>List Phase of Program</span>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{phaseTitle}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="detail-left">
              <div className="left__container">
                <Menu mode="inline" style={{borderRight: 0, backgroundColor: 'white'}}>
                  {checklists.map((checklist) => {
                    return (
                      <SubMenu
                        style={{
                          borderBottom: '1px solid #e8e8e8',
                        }}
                        key={checklist.id}
                        title={
                          <div
                            style={{
                              fontSize: '18px',
                              fontWeight: 'bold',
                            }}
                          >
                            {checklist?.title}
                          </div>
                        }
                      >
                        {sortByField(checklist?.tasks, 'index').map((task: any) => {
                          return (
                            <Menu.Item key={task.id} onClick={() => renderTask(task)}>
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
                            icon={<PlusCircleOutlined/>}
                            style={{
                              width: '100%',
                            }}
                          >
                            Add Task
                          </Button>
                        </div>
                      </SubMenu>
                    );
                  })}
                </Menu>
                <div className="add-btn">
                  <Button
                    type="primary"
                    onClick={showChecklistModal}
                    className="add-checklist-btn"
                    icon={<PlusCircleOutlined/>}
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      height: '50px',
                    }}
                  >
                    Add Checklist
                  </Button>
                </div>
              </div>
            </div>
            <div className="detail-right">
              {task ? (
                <TaskContent setTaskNull={setTaskNull} fetchChecklists={fetchChecklists} task={task}/>
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
              <Button key="cancel" style={{marginRight: '10px'}} onClick={handleTaskCancel}>
                Cancel
              </Button>,
              <Button key="create" type="primary" onClick={handleTaskOk}>
                Create
              </Button>,
            ]}
          >
            <div className="form">
              <div className="field">
                <label>Title</label>
                <Input style={{width: '100%', marginTop: '10px'}} value={taskTitle} onChange={changeTaskTitle}/>
              </div>
              <div className="field">
                <label>Choose type of task</label>
                <Select value={taskType} style={{width: '100%', marginTop: '10px'}} onChange={changeTaskType}>
                  <Option value="1">Single-Choice</Option>
                  <Option value="2">Multiple-Choice</Option>
                  <Option value="3">Constructed-Response</Option>
                  <Option value="4">True-False</Option>
                  <Option value="5">Match Sequence</Option>
                  <Option value="6">Match Correcsponding</Option>
                  <Option value="7">Document</Option>
                  <Option value="8">Assignment</Option>
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
              <Button key="cancel" style={{marginRight: '10px'}} onClick={handleChecklistCancel}>
                Cancel
              </Button>,
              <Button key="create" type="primary" onClick={handleChecklistOk}>
                Create
              </Button>,
            ]}
          >
            <div className="form">
              <div className="field">
                <label>Title</label>
                <Input value={checklistTitle} onChange={(e) => setChecklistTitle(e.target.value)}/>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default PhaseDetail;
