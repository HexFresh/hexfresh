import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, Breadcrumb } from 'antd';
import { CircularProgress } from '@mui/material';
import { CheckCircleOutlined, CloseCircleOutlined, HomeOutlined, ApartmentOutlined } from '@ant-design/icons';
import { getAllFresherChecklist, getPhaseById, getUserInfoById } from '../../api/mentor/review/api';
import { sortByField } from '../../utils/common';
import { IUserChecklist, ITask } from './interface';
import './review-task.css';
import TaskReview from '../../components/mentor/task-review/TaskReview';

const { SubMenu } = Menu;

export default function ReviewTask() {
  const [username, setUsername] = React.useState('');
  const [phaseTitle, setPhaseTitle] = React.useState('');
  const [checklists, setChecklists] = React.useState<IUserChecklist[]>([]);
  const [selectedTask, setSelectedTask] = React.useState<ITask | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fresherId = useParams<{ fresherId: string }>().fresherId;
  const phaseId = useParams<{ phaseId: string }>().phaseId;

  const fetchChecklists = async () => {
    const result = await getAllFresherChecklist(fresherId, phaseId);
    console.log(result);
    setChecklists(result || []);
  };

  const fetchPhaseById = async () => {
    const result = await getPhaseById(fresherId, phaseId);
    setPhaseTitle(result?.phase?.title);
  };

  const fetchUserInfo = async () => {
    const result = await getUserInfoById(fresherId);
    setUsername(result?.username);
  };

  useEffect(() => {
    document.title = 'HexF - Review Task';
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchChecklists(), fetchPhaseById(), fetchUserInfo()]);
      setLoading(false);
    };
    fetchData();
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
    <div className="review-task-main">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="review-task">
          <div className="topbar">
            <Link className="topbar__left" to="/mentor/freshers">
              <img src="/logo.svg" width="36px" alt="logo" />
            </Link>
            <div className="topbar__mid">{`Review task in ${phaseTitle} of fresher ${username}`}</div>
            <div className="topbar__right"></div>
          </div>
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/mentor/freshers">
                  <HomeOutlined
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  <span>List Fresher</span>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/mentor/freshers/${fresherId}`}>
                  <ApartmentOutlined
                    style={{
                      marginRight: '5px',
                    }}
                  />
                  <span>{`List phase of fresher ${username}`}</span>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{phaseTitle}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="content">
            <div className="detail-left">
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
            </div>
            <div className="detail-right">
              {selectedTask ? (
                <TaskReview selectedTask={selectedTask} />
              ) : (
                <div className="no-task">No Selected Task</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
