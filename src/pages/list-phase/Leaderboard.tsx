import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ILeaderboard, IUserLeaderboardRow} from "../fresher-leaderboard/interface";
import {findAllUsersInLeaderboard} from "./api";
import Avatar from "@mui/material/Avatar";
import {CircularProgress} from "@mui/material";

export default function Leaderboard(props: any) {
  const [leaderboard, setLeaderboard] = useState<ILeaderboard | null>(null);
  const [loading, setLoading] = useState(false);
  const {programId} = props;

  const fetchLeaderboard = async () => {
    const result = await findAllUsersInLeaderboard(programId);
    console.log(result);
    setLeaderboard(result);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchLeaderboard()]);
      setLoading(false);
    }
    fetchData().then(r => {
      console.log(r);
    });
  }, [programId]);

  const renderRank = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="rank">
            <img className="medal" src="https://img.icons8.com/color/48/000000/gold-medal.png" alt={"medal"}/>
          </div>
        );
      case 2:
        return (
          <div className="rank">
            <img className="medal" src="https://img.icons8.com/color/48/000000/silver-medal.png" alt={"medal"}/>
          </div>
        );
      case 3:
        return (
          <div className="rank">
            <img className="medal" src="https://img.icons8.com/color/48/000000/bronze-medal.png" alt={"medal"}/>
          </div>
        );
      default:
        return <div className="rank">{rank}</div>;
    }
  };
  return (
    <div className="leaderboard__container">
      {
        loading ? (<CircularProgress className={"circular-progress"}/>) : (
          <div className="leaderboard__container__content">
            {leaderboard?.user_leaderboards.rows.map((item: IUserLeaderboardRow, index: number) => (
              <Link to={`/mentor/freshers/${item.userId}`} className="leaderboard__container__content__item"
                    key={index}>
                <div className="leaderboard__container__content__item--left">
                  <div className="leaderboard__container__content__item__rank">{renderRank(index + 1)}</div>
                  <div className="leaderboard__container__content__item__avatar">
                    <Avatar style={{
                      width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', border: 'none'
                    }}
                            src={item?.user?.user_information.avatar}
                            alt=""/>
                  </div>
                  <div className="leaderboard__container__content__item__name">{item.user.username}</div>
                </div>
                <div className="leaderboard__container__content__item--right">
                  <div className="leaderboard__container__content__item__point">{item.point}</div>
                </div>
              </Link>
            ))}
          </div>)
      }
    </div>
  );
}
