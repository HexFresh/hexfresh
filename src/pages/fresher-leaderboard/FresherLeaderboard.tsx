import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Star from '../../components/layouts/star/Star';
import './fresher-leaderboard.css';
import { Link } from 'react-router-dom';

const data = [
  {
    name: 'Nguyễn Văn A',
    point: '100',
    rank: 1,
  },
  {
    name: 'Nguyễn Văn B',
    point: '90',
    rank: 2,
  },
  {
    name: 'Nguyễn Văn C',
    point: '80',
    rank: 3,
  },
  {
    name: 'Nguyễn Văn D',
    point: '70',
    rank: 4,
  },
  {
    name: 'Nguyễn Văn E',
    point: '60',
    rank: 5,
  },
  {
    name: 'Nguyễn Văn F',
    point: '60',
    rank: 6,
  },
  {
    name: 'Nguyễn Văn G',
    point: '60',
    rank: 7,
  },
];

interface IMember {
  name: string;
  point: string;
  rank: number;
}

export default function FresherLeaderboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<IMember[] | []>([]);
  const [outThree, setOutThree] = useState<IMember[] | []>([]);

  const fetchLeaderboard = async () => {
    setLeaderboard(data);
    if (leaderboard.length > 3) {
      setOutThree(leaderboard.slice(3));
    }
    console.log(data);
  };

  console.log({ leaderboard, outThree });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchLeaderboard();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="fresher-leaderboard">
      <Star />

      <Link className="back" to="/planets">
        <ArrowLeftOutlined />
        Back to Home
      </Link>
      <div className="fresher-leaderboard__container__title">Leaderboard</div>
      {loading ? (
        <CircularProgress className="circular-progress" />
      ) : (
        <div className="fresher-leaderboard__container">
          <div className="top-three">
            <div className="top-three__item side">
              {leaderboard[1] && (
                <>
                  <div className="top-three__avt">
                    <img
                      className="avt"
                      src="https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                      alt="avt"
                    />
                  </div>
                  <div className="top-three__medal">
                    <img className="medal" src="./medal2.png" alt="medal" />
                  </div>
                  <div className="top-three__name">{leaderboard[1]?.name}</div>
                  <div className="top-three__point">{leaderboard[1]?.point}</div>
                </>
              )}
            </div>
            <div className="top-three__item">
              {leaderboard[0] && (
                <>
                  <div className="top-three__avt">
                    <img
                      className="avt"
                      src="https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                      alt="avt"
                    />
                  </div>
                  <div className="top-three__medal">
                    <img className="medal" src="./medal1.png" alt="medal" />
                  </div>
                  <div className="top-three__name">{leaderboard[0]?.name}</div>
                  <div className="top-three__point">{leaderboard[0]?.point}</div>
                </>
              )}
            </div>
            <div className="top-three__item side">
              {leaderboard[2] && (
                <>
                  <div className="top-three__avt">
                    <img
                      className="avt"
                      src="https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                      alt="avt"
                    />
                  </div>
                  <div className="top-three__medal">
                    <img className="medal" src="./medal3.png" alt="medal" />
                  </div>
                  <div className="top-three__name">{leaderboard[2]?.name}</div>
                  <div className="top-three__point">{leaderboard[2]?.point}</div>
                </>
              )}
            </div>
          </div>

          <div className="out-three">
            {leaderboard.length > 3 &&
              leaderboard.slice(3).map((item, index) => (
                <div className="out-three__item" key={index}>
                  <div className="left">
                    <div className="left__content">{`#${item.rank}`}</div>
                  </div>
                  <div className="mid">
                    <div className="mid__avt">
                      <img
                        className="avt"
                        src="https://i.pinimg.com/236x/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                        alt="avt"
                      />
                    </div>
                    <div className="mid__name">{item.name}</div>
                  </div>
                  <div className="right">
                    <div className="right__content">{item.point}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}