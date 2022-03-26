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
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import './list-program.css';
import { getPrograms } from '../../api/mentor/mentorApi';

interface IProgram {
  id: string;
  title: string;
}

const programPerPage = 4;

export default function ListProgram() {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<IProgram[] | []>([]);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const getArrProgramsWithPagination = (page: number, programs: any) => {
    const start = (page - 1) * programPerPage;
    const end = page * programPerPage;
    return programs.slice(start, end);
  };

  useEffect(() => {
    document.title = 'Programs';
    const fetchPrograms = async () => {
      setLoading(true);
      const result = await getPrograms();
      setPrograms(
        result || [
          {
            id: '1',
            title: 'Program 1',
          },
        ]
      );
      setLoading(false);
    };
    fetchPrograms();
  }, []);

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
              <div className="filter">Filter</div>
              <div className="search">
                <SearchIcon />
                <InputBase placeholder="Search" />
              </div>
            </div>
          </div>
          <div className="programs">
            {loading ? (
              <CircularProgress />
            ) : (
              <div className="programs__container">
                <Grid container spacing={2}>
                  {getArrProgramsWithPagination(page, programs).map(
                    (program: any) => {
                      return (
                        <Grid key={program.id} item xs={12} sm={6} lg={3}>
                          <Link
                            key={program.id}
                            to={`/mentor/programs/${program.id}/phases`}
                          >
                            <div className="program">
                              <div className="cover-photo"></div>
                              <div className="program-name">
                                {program.title}
                              </div>
                            </div>
                          </Link>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </div>
            )}
          </div>
          <div className="pagination">
            <Pagination
              count={Math.ceil(programs.length / 4)}
              shape="rounded"
              color="primary"
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
