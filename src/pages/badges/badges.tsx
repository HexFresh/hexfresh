import { CircularProgress, Grid } from "@mui/material";
import { Breadcrumb, Button, Pagination, Spin, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import { isEmpty } from "lodash";
import { FC, Key, memo, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { BadgeList } from '../../components/badges/badge-list/badge-list.component';
import HeaderInternal from "../../components/layouts/Header/HeaderInternal";
import { EmptyResult } from "../../components/results";
import { USER_PROFILE_TABS } from "../../constant";
import { IRootDispatch, IRootStore } from "../../store/store";

const Badges: FC<BadgesProps> = memo(({
  /* actions */
  doFetchBadges,
  setSelectedUserTab,

  /* selectors */
  badges,
  isFetchingBadges,
}) => {
  const navigate = useNavigate();
  const [ page, setPage ] = useState<number>(1);
  const [ count, setCount ] = useState<number>(1);

  useEffect(() => {
    setSelectedUserTab(USER_PROFILE_TABS.BADGES);
    navigate('/user/profile');
  }, [])

  if (isFetchingBadges) {
    
    return <Spin size="large" />
  }
  return <>
    <HeaderInternal textColorClassName='txt-color-black' />
    <Content className='centered' style={{ padding: '0 50px' }}>

      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Badges</Breadcrumb.Item>
      </Breadcrumb>
      {isEmpty(badges) && !isFetchingBadges ? <EmptyResult message="Your badges will displayed here." /> :
        <BadgeList badges={badges} count={count} page={page}/>}
    </Content>
  </>
})

const mapStateToProps = (state: IRootStore) => ({
  badges: state.badge.badges,
  isFetchingBadges: state.badge.isFetchingBadges,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doFetchBadges: dispatch.badge.doFetchBadges,
  setSelectedUserTab: dispatch.app.setSelectedUserTab,
});

type BadgesStatesProps = ReturnType<typeof mapStateToProps>;
type BadgesDispatchProps = ReturnType<typeof mapDispatchToProps>;
type BadgesProps = BadgesStatesProps & BadgesDispatchProps;

Badges.displayName = 'Badges'

export default connect(mapStateToProps, mapDispatchToProps)(Badges);