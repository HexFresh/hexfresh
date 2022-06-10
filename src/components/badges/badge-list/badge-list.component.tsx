import { memo } from "react";
import { map } from "lodash";
import { Col, Row } from "antd";

import { IBadge } from "../../../store/badge/badge-interface";
import { BadgeItem } from "../badge-item/badge-item.component";

import './badge-list.component.scss';

export const BadgeList = memo(({
  badges
}:{badges: IBadge[]}) => {
  return <>
    <Row gutter={[ 48, 16 ]} className='badges-row'>
      {map(badges,badge=>(
      <Col span={7} className='badge-item'>
        <BadgeItem badge={badge} />
      </Col>
      ))}
    </Row>
  </>
});

BadgeList.displayName = 'BadgeList';