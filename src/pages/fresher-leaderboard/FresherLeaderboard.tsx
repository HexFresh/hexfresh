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
  const [loading, setLoading] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<ILeaderboard | null>(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const fetchLeaderboard = async (limit: number, offset: number) => {
    const result = await getFresherLeaderboard({limit, offset});
    if (result) {
      setLeaderboard(result);
    }
  };

  const renderName = (firstName: string, lastName: string, username: string) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else {
      return username;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchLeaderboard(nPerPage, (page - 1) * nPerPage);
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
        leaderboard === null ? (
          <div className={"no-leaderboard"}>Leaderboard is not public yet, please come another time</div>) : (
          <div className="fresher-leaderboard__container">
            <div className="top-three">
              <div className="top-three__item side">
                {leaderboard?.user_leaderboards[1] && (
                  <>
                    <div className="top-three__avt">
                      <img
                        className="avt"
                        src={leaderboard?.user_leaderboards[1].user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                        alt="avt"
                      />
                    </div>
                    <div className="top-three__medal">
                      <img className="medal" src="./medal2.png" alt="medal"/>
                    </div>
                    <div
                      className="top-three__name">{renderName(leaderboard?.user_leaderboards[1].user.user_information.firstName, leaderboard?.user_leaderboards[1].user.user_information.lastName, leaderboard?.user_leaderboards[1].user.username)}</div>
                    <div className="top-three__point">{leaderboard?.user_leaderboards[1]?.point}</div>
                  </>
                )}
              </div>
              <div className="top-three__item">
                {leaderboard?.user_leaderboards[0] && (
                  <>
                    <div className="top-three__avt">
                      <img
                        className="avt"
                        src={leaderboard?.user_leaderboards[0].user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                        alt="avt"
                      />
                    </div>
                    <div className="top-three__medal">
                      <img className="medal" src="./medal1.png" alt="medal"/>
                    </div>
                    <div
                      className="top-three__name">{renderName(leaderboard?.user_leaderboards[0].user.user_information.firstName, leaderboard?.user_leaderboards[0].user.user_information.lastName, leaderboard?.user_leaderboards[0].user.username)}</div>
                    <div className="top-three__point">{leaderboard?.user_leaderboards[0]?.point}</div>
                  </>
                )}
              </div>
              <div className="top-three__item side">
                {leaderboard?.user_leaderboards[2] && (
                  <>
                    <div className="top-three__avt">
                      <img
                        className="avt"
                        src={leaderboard?.user_leaderboards[2].user.user_information.avatar || "https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"}
                        alt="avt"
                      />
                    </div>
                    <div className="top-three__medal">
                      <img className="medal" src="./medal3.png" alt="medal"/>
                    </div>
                    <div
                      className="top-three__name">{renderName(leaderboard?.user_leaderboards[2].user.user_information.firstName, leaderboard?.user_leaderboards[2].user.user_information.lastName, leaderboard?.user_leaderboards[2].user.username)}</div>
                    <div className="top-three__point">{leaderboard?.user_leaderboards[2]?.point}</div>
                  </>
                )}
              </div>
            </div>

            <div className="out-three">
              {
                leaderboard?.user_leaderboards.map((item, index) => (
                  <div className="out-three__item" key={index}>
                    <div className="left">
                      <div className="left__content">{`#${index + 1}`}</div>
                    </div>
                    <div className="mid">
                      <div className="mid__left">
                        <div className="mid__avt">
                          <img
                            className="avt"
                            src="https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
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
                ))}
            </div>
            <div className="pagination">
              <Pagination
                current={count === 0 ? undefined : page}
                total={6}
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
