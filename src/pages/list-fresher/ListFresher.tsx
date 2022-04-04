import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Apps, School, Settings, Folder, Search } from '@mui/icons-material';
import {
  Tooltip,
  Fade,
  InputBase,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Pagination, Table } from 'antd';
import { getFreshers } from './data';
import './list-fresher.css';

interface IFresher {
  id: string;
  username: string;
  program: string;
  percent: number;
  date: string;
  status: string;
}

const nPerPage = 6;

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    sorter: (a: IFresher, b: IFresher) =>
      ('' + a.username).localeCompare(b.username),
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
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

export default function ListProgram() {
  const [loading, setLoading] = useState(false);
  const [freshers, setFreshers] = useState<IFresher[] | []>([]);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = React.useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const fetchFreshers = async (
    keyword: string,
    limit: number,
    offset: number
  ) => {
    setLoading(true);
    const freshers = await getFreshers(keyword, limit, offset);
    setFreshers(freshers.data);
    setCount(freshers.count);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'HexF - List Fresher';
    fetchFreshers(keyword, nPerPage, (page - 1) * nPerPage);

    return () => {
      setFreshers([]);
      setCount(0);
    };
  }, [page, keyword]);

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
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Programs"
              placement="right"
              arrow
            >
              <Link className="link apps" to="/mentor/programs">
                <Apps sx={{ width: 40, height: 40 }} />
              </Link>
            </Tooltip>
          </div>
          <div className="menu-item active">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Freshers"
              placement="right"
              arrow
            >
              <School sx={{ width: 40, height: 40 }} />
            </Tooltip>
          </div>

          <div className="bottom">
            <div className="folder">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Resources"
                placement="right"
                arrow
              >
                <Folder sx={{ width: 30, height: 30 }} />
              </Tooltip>
            </div>
            <div className="settings">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Settings"
                placement="right"
                arrow
              >
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
                <Table
                  className="table"
                  columns={columns}
                  dataSource={freshers}
                  pagination={false}
                />
                <div className="pagination">
                  <Pagination
                    current={count === 0 ? undefined : page}
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
    </div>
  );
}
