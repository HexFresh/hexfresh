import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { Pagination } from 'antd';
import './list-program.css';
import { getPrograms } from '../../api/mentor/mentorApi';

interface IProgram {
  id: string;
  title: string;
}

const nPerPage = 4;

export default function ListProgram() {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<IProgram[] | []>([]);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = React.useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const fetchPrograms = async (
    keyword: string,
    limit: number,
    offset: number
  ) => {
    setLoading(true);
    const result = await getPrograms({ keyword, limit, offset });
    setPrograms(result.rows || []);
    setCount(result.count);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'HexF - List Program';
    fetchPrograms(keyword, nPerPage, (page - 1) * nPerPage);
  }, [page, keyword]);

  return (
    <div className="list-program">
      <div className="container">
        <div className="menu">
          <div className="logo">
            <Link to="/mentor/programs">
              <img src="/logo.svg" width="40px" alt="logo" />
            </Link>
          </div>
          <div className="menu-item active">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Programs"
              placement="right"
              arrow
            >
              <Link className="link apps" to="/mentor/programs">
                <AppsIcon sx={{ width: 40, height: 40 }} />
              </Link>
            </Tooltip>
          </div>
          <div className="menu-item">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Freshers"
              placement="right"
              arrow
            >
              <SchoolIcon sx={{ width: 40, height: 40 }} />
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
                <FolderIcon sx={{ width: 30, height: 30 }} />
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
                <SettingsIcon sx={{ width: 30, height: 30 }} />
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
            <div className="container">Programs</div>
          </div>
          <div className="filter-search">
            <div className="container">
              <div className="search">
                <SearchIcon style={{ width: '20px', height: '20px' }} />
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
          <div className="programs">
            {loading ? (
              <CircularProgress />
            ) : count > 0 ? (
              <div className="programs__container">
                <Grid container spacing={2}>
                  {programs.map((program: any) => {
                    return (
                      <Grid key={program.id} item xs={12} sm={6} lg={3}>
                        <div className="program">
                          <div className="cover-photo">
                            <img
                              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80a9d98d-327f-4bb2-b173-4298d710e51c/derkflv-9f975f3d-791f-4e16-8d9d-fb0a9e5e0554.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwYTlkOThkLTMyN2YtNGJiMi1iMTczLTQyOThkNzEwZTUxY1wvZGVya2Zsdi05Zjk3NWYzZC03OTFmLTRlMTYtOGQ5ZC1mYjBhOWU1ZTA1NTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.eEDVAlJGBqXo6OeZEORXWk1veGSHFL-ZTUMz43Jtr3Q"
                              alt="img"
                            />
                          </div>
                          <div className="program-name">
                            <Link
                              className="link"
                              to={`/mentor/programs/${program.id}/phases`}
                            >
                              {program.title}
                            </Link>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            ) : (
              <div className="img-404">
                <img style={{ height: '200px' }} src="/no-records.png" />
              </div>
            )}
          </div>
          <div className="pagination">
            <Pagination
              current={count === 0 ? undefined : page}
              total={count}
              pageSize={4}
              onChange={handleChangePage}
              hideOnSinglePage
            />
          </div>
        </div>
      </div>
    </div>
  );
}
