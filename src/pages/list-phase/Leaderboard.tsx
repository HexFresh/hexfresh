import React, { useState } from 'react';

const data = [
  {
    name: 'Nguyễn Văn A',
    point: '100',
    avatar: 'https://i.pinimg.com/originals/f4/b7/b1/f4b7b1c8f9f9f9f9.jpg',
    rank: 1,
  },

  {
    name: 'Nguyễn Văn B',
    point: '90',
    avatar: 'https://i.pinimg.com/originals/f4/b7/b1/f4b7b1c8f9f9f9f9.jpg',
    rank: 2,
  },

  {
    name: 'Nguyễn Văn C',
    point: '80',
    avatar: 'https://i.pinimg.com/originals/f4/b7/b1/f4b7b1c8f9f9f9f9.jpg',
    rank: 3,
  },
  {
    name: 'Nguyễn Văn D',
    point: '70',
    avatar: 'https://i.pinimg.com/originals/f4/b7/b1/f4b7b1c8f9f9f9f9.jpg',
    rank: 4,
  },
  {
    name: 'Nguyễn Văn E',
    point: '60',
    avatar: 'https://i.pinimg.com/originals/f4/b7/b1/f4b7b1c8f9f9f9f9.jpg',
    rank: 5,
  },
];

export default function Leaderboard(props: any) {
  const [leaderboard, setLeaderboard] = useState(data);
  const { programId } = props;
  const renderRank = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="rank">
            <img className="medal" src="https://img.icons8.com/color/48/000000/gold-medal.png" />
          </div>
        );
      case 2:
        return (
          <div className="rank">
            <img className="medal" src="https://img.icons8.com/color/48/000000/silver-medal.png" />
          </div>
        );
      case 3:
        return (
          <div className="rank">
            <img className="medal" src="https://img.icons8.com/color/48/000000/bronze-medal.png" />
          </div>
        );
      default:
        return <div className="rank">{rank}</div>;
    }
  };
  return (
    <div className="leaderboard__container">
      <div className="leaderboard__container__content">
        {leaderboard.map((item: any, index: number) => (
          <div className="leaderboard__container__content__item" key={index}>
            <div className="leaderboard__container__content__item--left">
              <div className="leaderboard__container__content__item__rank">{renderRank(item.rank)}</div>
              <div className="leaderboard__container__content__item__avatar">
                <img
                  src="https://demoda.vn/wp-content/uploads/2022/01/anh-nen-toi-gian-minimalist-hoat-hinh.jpg"
                  alt="avt"
                />
              </div>
              <div className="leaderboard__container__content__item__name">{item.name}</div>
            </div>
            <div className="leaderboard__container__content__item--right">
              <div className="leaderboard__container__content__item__point">{item.point}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
