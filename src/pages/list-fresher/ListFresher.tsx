import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Apps, School, Settings, Folder, Search } from '@mui/icons-material';
import { InputBase, Avatar, CircularProgress } from '@mui/material';
import { Pagination, Table, Button, Tooltip, Modal, Select, message } from 'antd';
import { AuditOutlined } from '@ant-design/icons';
import { getFreshers } from './data';
import { getPrograms, assignProgramToFresher } from '../../api/mentor/mentorApi';
import './list-fresher.css';

interface IFresher {
  id: string;
  username: string;
  program: string;
  percent: number;
  date: string;
  status: string;
}

interface IProgram {
  id: string;
  title: string;
}

const nPerPage = 6;

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
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Completion percentage (%)',
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: 'Program start time',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: () => <div className="flex--center">Action</div>,
      dataIndex: 'status',
      key: 'status',
      render: (status: string, fresher: IFresher) => (
        <div
          key={fresher.id}
          className="action"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Tooltip title="Assign program">
            <Button
              onClick={() => showModal(fresher.id)}
              disabled={status !== 'completed'}
              shape="circle"
              icon={<AuditOutlined />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const fetchFreshers = async (keyword: string, limit: number, offset: number) => {
    setLoading(true);
    const freshers = await getFreshers(keyword, limit, offset);
    setFreshers(freshers.data);
    setCount(freshers.count);
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
