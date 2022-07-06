import { memo } from "react";

import './stats-card.style.scss';
export interface StatCardItem {
  title: string, number: number, icon: string, id: string,
}
export const StatsCard = memo(({ stat }: { stat: StatCardItem }) => {
  return <div className="status-card" >
    <div className="container">
      <div className="right">
        <img src={stat?.icon} alt='icon' />
      </div>
      <div className="left">
        <div className="number">{stat?.number}</div>
        <div className="name">{stat?.title}</div>
      </div>
    </div>
  </div>
});

StatsCard.displayName = 'StatsCard';