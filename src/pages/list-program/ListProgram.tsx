/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Search} from '@mui/icons-material';
import {InputBase, CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid';
import {Pagination} from 'antd';
import './list-program.css';
import {getPrograms} from '../../api/mentor/mentorApi';
import Sidebar from "../../components/side-bar/Sidebar";

interface IProgram {
  id: string;
  title: string;
  image: {
    imageLink: string
  }
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

  const fetchPrograms = async (keyword: string, limit: number, offset: number) => {
    setLoading(true);
    const result = await getPrograms({keyword, limit, offset});
    setPrograms(result.rows || []);
    setCount(result.count);
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem('sideBarTitle', 'programs');
    document.title = 'HexF - List Program';
    fetchPrograms(keyword, nPerPage, (page - 1) * nPerPage);
  }, [page, keyword]);

  return (
    <div className="list-program">
      <div className="container">
        <Sidebar/>
        <div className="page-content">
          <div className="topbar">
            <img src="/logo.svg" width="30px" alt="logo"/>
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">Programs</div>
          </div>
          <div className="filter-search">
            <div className="container">
              <div className="search">
                <Search style={{width: '20px', height: '20px'}}/>
                <InputBase
                  value={keyword}
                  onChange={(e) => {
                    setPage(1);
                    setKeyword(e.target.value);
                  }}
                  placeholder="Search"
                  style={{fontSize: '14px', width: '100%'}}
                />
              </div>
              <div className="filter"></div>
            </div>
          </div>
          <div className="programs">
            {loading ? (
              <CircularProgress/>
            ) : count > 0 ? (
              <div className="programs__container">
                <Grid container spacing={2}>
                  {programs.map((program: any) => {
                    return (
                      <Grid key={program.id} item xs={12} sm={6} lg={3}>
                        <div className="program">
                          <div className="cover-photo">
                            <img
                              src={program?.image?.imageLink}
                              alt="cover-photo"
                            />
                          </div>
                          <div className="program-name">
                            <Link className="link"
                                  to={`/mentor/programs/${program.id}/phases`}>
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
                <img style={{height: '200px'}} src="/no-records.png" alt="img"/>
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
