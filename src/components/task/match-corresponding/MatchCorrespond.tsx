import { memo } from "react";
import _ from "lodash";
import { Card, Col, Row, Space } from "antd";
import { CloseOutlined } from "@mui/icons-material";

import { ITask } from "../../../interface/program-interface";
import { IMatchingSequencePair } from "../TaskItem";

export const MatchCorrespond = memo(({
  isEdit,
  isTaken,
  task,
  matchingCorespondingData,
  matchingSequencePairs,
  pairIds,
  onChooseNewPair,
  onRemovePair,
}: {
  isEdit: boolean,
  isTaken: boolean,
  task: ITask,
  matchingCorespondingData: any,
  matchingSequencePairs: IMatchingSequencePair[],
  pairIds: string[],
  onChooseNewPair: any,
  onRemovePair: any,
})=>{
  return<>
  <Row>
    <Col span={10}>
      <Space direction='vertical' style={{ width: '100%' }}>
        {_.map(matchingCorespondingData[0], card => <Card
          onClick={()=>{onChooseNewPair({item: card, column: 0 })}}
          size='small' key={card.id}
          className={`matching__card${card.id === pairIds[0] ? '-clicked' : ''}`}>{card.content}</Card>)}
      </Space>
    </Col>
    <Col span={4} />
    <Col span={10}>
      <Space direction='vertical' style={{ width: '100%' }}>
        {_.map(matchingCorespondingData[1], card => <Card
          onClick={()=>{onChooseNewPair({item: card, column: 1 })}}
          size='small' key={card.id}
          className={`matching__card${card.id === pairIds[1] ? '-clicked' : ''}`}>{card.content}</Card>)}
      </Space>
    </Col>
  </Row>
  <Row>
    <Col span={24}>
      <Space direction='vertical' style={{ width: '100%' }} className='mt-large-x2'>
        {_.map(matchingSequencePairs, card => (

          <Row key={card.id}>
            <Col span={11}>
              <Card size='small'>{card.pair[0].content}</Card>
            </Col>
            <Col span={11}>
              <Card size='small' >{card.pair[1].content}</Card>
            </Col>
            <Col span={2}>
              <Card size='small' ><CloseOutlined onClick={()=>{onRemovePair({ pairId: card.id })}} className='close-badge' color='action' /></Card>
            </Col>
          </Row>
        ))}
      </Space>
    </Col>
  </Row>
</>
});

MatchCorrespond.displayName='MatchCorrespond';