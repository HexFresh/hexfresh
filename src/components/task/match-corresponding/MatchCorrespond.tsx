import { memo } from "react";
import _ from "lodash";
import { Card, Col, Row, Space } from "antd";
import { CloseOutlined } from "@mui/icons-material";

import { IMatchingSequencePair } from "../TaskItem";
import { INT_ONE, INT_ZERO } from "../../../constant";

export const MatchCorrespond = memo(({
  isEdit,
  isTaken,
  matchingCorespondingData,
  matchingSequencePairs,
  pairIds,
  onChooseNewPair,
  onRemovePair,
}: {
  isEdit: boolean,
  isTaken: boolean,
  matchingCorespondingData: any,
  matchingSequencePairs: IMatchingSequencePair[],
  pairIds: string[],
  onChooseNewPair: any,
  onRemovePair: any,
}) => {
  return <>
    {(!isTaken || isEdit) && <Row>
      <Col span={10}>
        <Space direction='vertical' style={{ width: '100%' }}>
          {_.map(matchingCorespondingData[ INT_ZERO ], card => <Card
            onClick={() => { onChooseNewPair({ item: card, column: INT_ZERO }) }}
            size='small' key={card.id}
            className={`matching__card${card.id === pairIds[ INT_ZERO ] ? '-clicked' : ''}`}>{card.content}</Card>)}
        </Space>
      </Col>
      <Col span={4} />
      <Col span={10}>
        <Space direction='vertical' style={{ width: '100%' }}>
          {_.map(matchingCorespondingData[ INT_ONE ], card => <Card
            onClick={() => { onChooseNewPair({ item: card, column: INT_ONE }) }}
            size='small' key={card.id}
            className={`matching__card${card.id === pairIds[ INT_ONE ] ? '-clicked' : ''}`}>{card.content}</Card>)}
        </Space>
      </Col>
    </Row>}
    <Row>
      <Col span={24}>
        <Space direction='vertical' style={{ width: '100%' }} className='mt-large-x2'>
          {_.map(matchingSequencePairs, card => (

            <Row key={card.id}>
              <Col span={11}>
                <Card size='small'>{card.pair[ 0 ].content}</Card>
              </Col>
              <Col span={11}>
                <Card size='small' >{card.pair[ 1 ].content}</Card>
              </Col>
              {(!isTaken || isEdit) && <Col span={2}>
                <Card size='small' ><CloseOutlined onClick={() => { onRemovePair({ pairId: card.id }) }} className='close-badge' color='action' /></Card>
              </Col>}
            </Row>
          ))}
        </Space>
      </Col>
    </Row>
  </>
});

MatchCorrespond.displayName = 'MatchCorrespond';