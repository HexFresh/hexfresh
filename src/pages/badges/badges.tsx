import { Breadcrumb, Spin } from "antd";
import { Content } from "antd/lib/layout/layout";
import { isEmpty } from "lodash";
import { FC, memo, useEffect } from "react";
import { connect } from 'react-redux'

import { BadgeList } from '../../components/badges/badge-list/badge-list.component';
import HeaderInternal from "../../components/layouts/Header/HeaderInternal";
import { EmptyResult } from "../../components/results";
import { IRootDispatch, IRootStore } from "../../store/store";

const Badges: FC<BadgesProps> = memo(({
  /* actions */
  doFetchBadges,

  /* selectors */
  badges,
  isFetchingBadges,
}) => {

  useEffect(() => {
    doFetchBadges();
  }, [])

  useEffect(()=>{
    console.log("🚀 ~ file: badges.tsx ~ line 27 ~ useEffect ~ isEmpty(badges)", isEmpty(badges))
    console.log("🚀 ~ file: badges.tsx ~ line 28 ~ badges", badges)
  },[badges])

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
      {isEmpty(badges) && !isFetchingBadges ? <EmptyResult message="Your badges will displayed here." /> : <BadgeList badges={badges} />}
    </Content>
  </>
})

const mapStateToProps = (state: IRootStore) => ({
  badges: state.badge.badges,
  isFetchingBadges: state.badge.isFetchingBadges,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doFetchBadges: dispatch.badge.doFetchBadges,
});

type BadgesStatesProps = ReturnType<typeof mapStateToProps>;
type BadgesDispatchProps = ReturnType<typeof mapDispatchToProps>;
type BadgesProps = BadgesStatesProps & BadgesDispatchProps;

Badges.displayName = 'Badges'

export default connect(mapStateToProps, mapDispatchToProps)(Badges);