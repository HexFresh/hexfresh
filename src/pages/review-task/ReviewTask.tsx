import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu } from 'antd';
import { CircularProgress } from '@mui/material';
import { CheckCircleOutlined, CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { getAllFresherChecklist } from '../../api/mentor/review/api';
import { sortByField } from '../../utils/common';
import { IUserChecklist, ITask } from './interface';
import './review-task.css';
import TaskReview from '../../components/mentor/task-review/TaskReview';

const { SubMenu } = Menu;

export default function ReviewTask() {
  const [checklists, setChecklists] = React.useState<IUserChecklist[]>([]);
  const [selectedTask, setSelectedTask] = React.useState<ITask | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fresherId = useParams<{ fresherId: string }>().fresherId;
  const phaseId = useParams<{ phaseId: string }>().phaseId;

  const fetchChecklists = async () => {
    setLoading(true);
    const result = await getAllFresherChecklist(fresherId, phaseId);
    setChecklists(result || []);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'HexF - Review Task';
    fetchChecklists();

    return () => {
      setChecklists([]);
      setSelectedTask(null);
    };
  }, []);

  const renderTask = (task: ITask) => {
    setSelectedTask(null);
    setSelectedTask(task);
  };

  const isRightUserTask = (checklistId: number, taskId: number) => {
    const tempChecklist = checklists.find((checklist) => checklist.checklistId === checklistId);
    const tempUserTask = tempChecklist?.userTasks.find((userTask) => userTask.taskId === taskId);
    if (tempUserTask) {
      return tempUserTask.isRight;
    }
  };

  return (
    <div className="review-task">
      <div className="topbar">
        <Link to="/mentor/freshers">
          <img src="/logo.svg" width="36px" alt="logo" />
        </Link>
        <div className="mid">Review Fresher</div>
        <div className="right"></div>
      </div>
      <div className="content">
        <div className="left">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="left__container">
              <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
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
                            textTransform: 'uppercase',
                          }}
                        >
                          {checklist?.checklist?.title}
                        </div>
                      }
                    >
                      {sortByField(checklist?.tasks, 'index').map((task: any) => {
                        return (
                          <Menu.Item key={task.id} onClick={() => renderTask(task)}>
                            <div className="task">
                              <div className="task-title">{task.title}</div>
                              <div className="task-status">
                                {isRightUserTask(checklist.checklistId, task.id) === null ? (
                                  <div
                                    style={{
                                      width: '26px',
                                      height: '26px',
                                      borderRadius: '50%',
                                      border: '3px solid gray',
                                    }}
                                  />
                                ) : isRightUserTask(checklist.checklistId, task.id) ? (
                                  <CheckCircleOutlined
                                    style={{
                                      fontSize: '26px',
                                      color: 'green',
                                    }}
                                  />
                                ) : (
                                  <CloseCircleOutlined
                                    style={{
                                      fontSize: '26px',
                                      color: 'red',
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  );
                })}
              </Menu>
            </div>
          )}
        </div>
        <div className="right">
          {selectedTask ? <TaskReview selectedTask={selectedTask} /> : <div className="no-task">No Selected Task</div>}
        </div>
      </div>
    </div>
  );
}
