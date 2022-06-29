import { Grid } from "@mui/material";
import { get, isEmpty, map } from "lodash";
import { memo, useMemo } from "react";
import { StatCardItem, StatsCard } from "../../../core/component/stats-card/stats-card.component";
import { IStats } from "../../../store/stats/stats.interface";
import { STAT_BOX_TYPE } from "./fresher-chart.constant";

export const StatsHeader = memo(({ stats }: { stats: IStats }) => {

  const statsArray = useMemo(() => {
    if(isEmpty(stats?.taskStat)) return [] as StatCardItem[];
    
    return Object.keys(stats?.taskStat).map((key, index) => {
      const number = get(stats?.taskStat, key);
      const icon = get(STAT_BOX_TYPE, key);
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        number,
        icon,
        id: key,
      }
    });

  }, [ stats ])


  return <div className="cards">
    <Grid container spacing={6} alignItems="stretch" className="mt-medium">
      {map(statsArray, stat => (<Grid key={stat.id} item xs={12} sm={6} lg={3}>
        <StatsCard stat={stat} ></StatsCard>
      </Grid>))}
    </Grid>
  </div>;
})

StatsHeader.displayName = 'StatsHeader'