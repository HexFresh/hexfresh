import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Apps, School, Settings, Folder, Search } from '@mui/icons-material';
import { InputBase, Avatar, CircularProgress } from '@mui/material';
import { Pagination, Table, Button, Tooltip, Modal, Select, message, Popconfirm } from 'antd';
import { AuditOutlined, FileExcelOutlined } from '@ant-design/icons';
import {
  getPrograms,
  assignProgramToFresher,
  getAllFresher,
  deleteProgramFromFresher,
} from '../../api/mentor/mentorApi';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './list-fresher.css';

interface IFresher {
  id: string;
  username: string;
  email: string;
  currentProgram: ICurrentProgram;
}

interface ICurrentProgram {
  id: number;
  completedPercentage: number;
  status: string;
  program: IProgram;
}

interface IProgram {
  id: number;
  title: string;
}

const nPerPage = 5;

const { Option } = Select;

export default function ListProgram() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freshers, setFreshers] = useState<IFresher[] | []>([]);
  const [programs, setPrograms] = useState<IProgram[] | []>([]);
  const [selectProgram, setSelectProgram] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = React.useState(1);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (username: string, fresher: IFresher) => (
        <Link key={fresher.id} to={`/mentor/freshers/${fresher.id}`}>
          {username}
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Program',
      key: 'program',
      render: (fresher: IFresher) => {
        if (fresher.currentProgram) {
          return <div>{fresher.currentProgram.program.title}</div>;
        }
        return (
          <div
            style={{
              color: 'red',
            }}
          >
            No program
          </div>
        );
      },
    },
    {
      title: () => <div className="flex--center">Status</div>,
      key: 'percent',
      render: (fresher: IFresher) =>
        fresher.currentProgram ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 50, height: 50 }}>
              <CircularProgressbar
                value={fresher?.currentProgram?.completedPercentage}
                maxValue={1}
                text={`${fresher?.currentProgram?.completedPercentage * 100}%`}
              />
            </div>
          </div>
        ) : (
          <></>
        ),
    },
    {
      title: () => <div className="flex--center">Action</div>,
      key: 'status',
      render: (fresher: IFresher) => (
        <div
          className="action"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            gridGap: '10px',
          }}
        >
          <Tooltip title="Assign program">
            <Button
              onClick={() => showModal(fresher.id)}
              disabled={fresher?.currentProgram?.status !== 'completed' && fresher?.currentProgram !== null}
              shape="circle"
              icon={<AuditOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="Remove Program">
            <Popconfirm
              disabled={fresher?.currentProgram === null}
              placement="bottomLeft"
              title="Are you sure to remove this program from fresher?"
              okText="Yes"
              onConfirm={() => handleRemoveProgram(fresher.id, fresher.currentProgram?.program.id)}
              cancelText="No"
            >
              <Button disabled={fresher?.currentProgram === null} shape="circle" icon={<FileExcelOutlined />}></Button>
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleRemoveProgram = (fresherId: string, programId: number) => {
    console.log({ fresherId, programId });
    const removeProgram = async () => {
      try {
        message.loading({ content: 'Removing...', key: 'removeProgram' }).then(async () => {
          await deleteProgramFromFresher(fresherId, programId);
          message.success('Program removed successfully');
          fetchFreshers(keyword, nPerPage, (page - 1) * nPerPage);
        });
      } catch (error) {
        message.error('Error');
      }
    };

    removeProgram();
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const fetchFreshers = async (keyword: string, limit: number, offset: number) => {
    setLoading(true);
    const result = await getAllFresher({ keyword, limit, offset });
    console.log(result);
    setFreshers(result.rows);
    setCount(result.count);
    setLoading(false);
  };

  const fetchPrograms = async () => {
    const programs = await getPrograms({ keyword: '', limit: null, offset: 0 });
    setPrograms(programs.rows);
  };

  useEffect(() => {
    document.title = 'HexF - List Fresher';
    fetchFreshers(keyword, nPerPage, (page - 1) * nPerPage);
    fetchPrograms();
    return () => {
      setFreshers([]);
      setCount(0);
    };
  }, [page, keyword]);

  const showModal = (id: string) => {
    setUserId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const handleAssignProgram = async () => {
      message.loading('Assigning program...').then(async () => {
        await assignProgramToFresher(userId, Number(selectProgram));
        message.success('Assign program successfully');
        fetchFreshers(keyword, nPerPage, (page - 1) * nPerPage);
        handleCancel();
      });
    };
    handleAssignProgram();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectProgram('');
  };

  return (
    <div className="list-fresher">
      <div className="container">
        <div className="menu">
          <div className="logo">
            <Link to="/mentor/programs">
              <img src="/logo.svg" width="40px" alt="logo" />
            </Link>
          </div>
          <div className="menu-item">
            <Tooltip color="#3751FF" title="Programs" placement="right">
              <Link className="link apps" to="/mentor/programs">
                <Apps sx={{ width: 40, height: 40 }} />
              </Link>
            </Tooltip>
          </div>
          <div className="menu-item active">
            <Tooltip color="#3751FF" title="Freshers" placement="right">
              <School sx={{ width: 40, height: 40 }} />
            </Tooltip>
          </div>

          <div className="bottom">
            <div className="folder">
              <Tooltip color="#3751FF" title="Resources" placement="right">
                <Folder sx={{ width: 30, height: 30 }} />
              </Tooltip>
            </div>
            <div className="settings">
              <Tooltip color="#3751FF" title="Settings" placement="right">
                <Settings sx={{ width: 30, height: 30 }} />
              </Tooltip>
            </div>
            <div className="avatar">
              <Avatar />
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="topbar">
            <img src="/logo.svg" width="30px" alt="logo" />
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">Freshers</div>
          </div>
          <div className="filter-search">
            <div className="container">
              <div className="search">
                <Search style={{ width: '20px', height: '20px' }} />
                <InputBase
                  value={keyword}
                  onChange={(e) => {
                    setPage(1);
                    setKeyword(e.target.value);
                  }}
                  placeholder="Search"
                  style={{ fontSize: '14px', width: '100%' }}
                />
              </div>
              <div className="filter"></div>
            </div>
          </div>
          <div className="freshers">
            {loading ? (
              <CircularProgress />
            ) : (
              <div className="freshers__container">
                <Table className="table" columns={columns} dataSource={freshers} pagination={false} />
                <div className="pagination">
                  <Pagination
                    current={page}
                    total={count}
                    pageSize={nPerPage}
                    onChange={handleChangePage}
                    hideOnSinglePage
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        className="modal"
        title="Assign Program"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button disabled={selectProgram === ''} key="submit" type="primary" onClick={handleOk}>
            Assign
          </Button>,
        ]}
      >
        <div className="form">
          <div className="field">
            <label>Choose program to assign</label>
            <Select
              value={selectProgram}
              onChange={(value: string) => setSelectProgram(value)}
              placeholder="Select program"
              style={{ width: '100%', marginTop: '10px' }}
            >
              {programs.map((program: any) => (
                <Option key={program.id} value={program.id}>
                  {program.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
