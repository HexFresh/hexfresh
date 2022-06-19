import {CircularProgress} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import Star from '../../components/layouts/star/Star';
import './fresher-leaderboard.css';
import {Link} from 'react-router-dom';
import {Pagination} from 'antd';
import {getFresherLeaderboard} from "./api";
import {ILeaderboard} from "./interface";

const nPerPage = 4;

export default function FresherLeaderboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard | null>(null);
  const [topLeaderboard, setTopLeaderboard] = useState<ILeaderboard | null>(null);
  const [page, setPage] = useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const fetchLeaderboard = async (limit: number, offset: number) => {
    setLoadingMore(true);
    const result = await getFresherLeaderboard({limit, offset});
    if (result) {
      setLeaderboard(result);
      setLoadingMore(false);
    }
  };

  const fetchTopLeaderboard = async () => {
    const result = await getFresherLeaderboard({limit: 3, offset: 0});
    if (result) {
      setTopLeaderboard(result);
    }
  }

  const renderName = (firstName: string, lastName: string, username: string) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return username;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchLeaderboard(nPerPage, (page - 1) * nPerPage);
      await fetchTopLeaderboard();
      setLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div className="fresher-leaderboard">
      <Star/>

      <Link className="back" to="/planets">
        <ArrowLeftOutlined/>
        Back to Home
      </Link>
      <div className="fresher-leaderboard__container__title">Leaderboard</div>
      {loading ? (
        <CircularProgress className="circular-progress"/>
      ) : (
        topLeaderboard === null ? (
          <div className={"no-leaderboard"}>Leaderboard is not public yet, please come another time</div>) : (
          <div className="fresher-leaderboard__container">
            <div className="top-three">
              <div className="top-three__item side">
                {topLeaderboard?.user_leaderboards.rows[1] ? (
                  <>
                    <div className="top-three__avt">
                      <img
                        className="avt"
                        src={topLeaderboard?.user_leaderboards.rows[1].user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                        alt="avt"
                      />
                    </div>
                    <div className="top-three__medal">
                      <img className="medal" src="./medal2.png" alt="medal"/>
                    </div>
                    <div
                      className="top-three__name">{renderName(topLeaderboard?.user_leaderboards.rows[1].user.user_information.firstName, topLeaderboard?.user_leaderboards.rows[1].user.user_information.lastName, topLeaderboard?.user_leaderboards.rows[1].user.username)}</div>
                    <div className="top-three__point">{topLeaderboard?.user_leaderboards.rows[1]?.point}</div>
                  </>
                ) : (<>
                  <div className="top-three__avt">
                    <img
                      className="avt"
                      src={"https://www.pcc.edu/online/wp-content/uploads/sites/78/2017/11/anonymous_user-500x452.png"}
                      alt="avt"
                    />
                  </div>
                </>)}
              </div>
              <div className="top-three__item">
                {topLeaderboard?.user_leaderboards.rows[0] ? (
                  <>
                    <div className="top-three__avt">
                      <img
                        className="avt"
                        src={topLeaderboard?.user_leaderboards.rows[0].user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                        alt="avt"
                      />
                    </div>
                    <div className="top-three__medal">
                      <img className="medal" src="./medal1.png" alt="medal"/>
                    </div>
                    <div
                      className="top-three__name">{renderName(topLeaderboard?.user_leaderboards.rows[0].user.user_information.firstName, topLeaderboard?.user_leaderboards.rows[0].user.user_information.lastName, topLeaderboard?.user_leaderboards.rows[0].user.username)}</div>
                    <div className="top-three__point">{topLeaderboard?.user_leaderboards.rows[0]?.point}</div>
                  </>
                ) : (<>
                  <div className="top-three__avt">
                    <img
                      className="avt"
                      src={"https://www.pcc.edu/online/wp-content/uploads/sites/78/2017/11/anonymous_user-500x452.png"}
                      alt="avt"
                    />
                  </div>
                </>)}
              </div>
              <div className="top-three__item side">
                {topLeaderboard?.user_leaderboards.rows[2] ? (
                  <>
                    <div className="top-three__avt">
                      <img
                        className="avt"
                        src={topLeaderboard?.user_leaderboards.rows[2].user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                        alt="avt"
                      />
                    </div>
                    <div className="top-three__medal">
                      <img className="medal" src="./medal3.png" alt="medal"/>
                    </div>
                    <div
                      className="top-three__name">{renderName(topLeaderboard?.user_leaderboards.rows[2].user.user_information.firstName, topLeaderboard?.user_leaderboards.rows[2].user.user_information.lastName, topLeaderboard?.user_leaderboards.rows[2].user.username)}</div>
                    <div className="top-three__point">{topLeaderboard?.user_leaderboards.rows[2]?.point}</div>
                  </>
                ) : (<>
                  <div className="top-three__avt">
                    <img
                      className="avt"
                      src={"https://www.pcc.edu/online/wp-content/uploads/sites/78/2017/11/anonymous_user-500x452.png"}
                      alt="avt"
                    />
                  </div>
                </>)}
              </div>
            </div>

            <div className="out-three">
              {
                loadingMore ? (<CircularProgress
                  className={"circular-progress"}/>) : (leaderboard?.user_leaderboards.rows.map((item, index) => (
                  <div className="out-three__item" key={index}>
                    <div className="left">
                      <div className="left__content">{`#${(page - 1) * nPerPage + index + 1}`}</div>
                    </div>
                    <div className="mid">
                      <div className="mid__left">
                        <div className="mid__avt">
                          <img
                            className="avt"
                            src={item.user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                            alt="avt"
                          />
                        </div>
                        <div
                          className="mid__name">{renderName(item.user.user_information.firstName, item.user.user_information.lastName, item.user.username)}</div>
                      </div>

                      <div className="mid__right">
                        <div className="right__content">{item.point}</div>
                      </div>
                    </div>
                  </div>
                )))
              }
            </div>
            <div className="pagination">
              <Pagination
                current={page}
                total={leaderboard?.user_leaderboards?.count}
                pageSize={nPerPage}
                onChange={handleChangePage}
                hideOnSinglePage
              />
            </div>
          </div>)
      )}
    </div>
  );
}
