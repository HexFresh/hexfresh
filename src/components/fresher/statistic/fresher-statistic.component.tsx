import { isEmpty } from "lodash";
import { FC, memo, useEffect } from "react";
import { connect } from "react-redux";

import { IRootDispatch, IRootStore } from "../../../store/store";
import { RocketLoading } from "../../loading/rocket-loading.component";
import { FresherLineChart } from "./fresher-chart.component";
import { StatsHeader } from "./statistic-header.component";

const FresherStatistic: FC<FresherStatisticProps> = memo(({
  isFetchingStats,
  stats,
  doFetchFresherStats,
}) => {

  useEffect(() => {
    doFetchFresherStats();
  }, [])

  return <>
    {isFetchingStats&&(isEmpty(stats)) ?
      <RocketLoading /> :
      <div className="header-statictic">
        <StatsHeader stats={stats} />
        <FresherLineChart stats={stats}/>
      </div>}

  </>
});

FresherStatistic.displayName = 'FresherStatistic'

const mapStateToProps = (state: IRootStore) => ({
  isFetchingStats: state.stats.isFetchingStats,
  stats: state.stats.stats,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doFetchFresherStats: dispatch.stats.doFetchFresherStats,
});

type FresherStatisticStateProps = ReturnType<typeof mapStateToProps>;
type FresherStatisticDispatchProps = ReturnType<typeof mapDispatchToProps>;
type FresherStatisticProps = FresherStatisticStateProps & FresherStatisticDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(FresherStatistic);