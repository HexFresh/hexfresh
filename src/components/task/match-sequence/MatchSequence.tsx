import { Card, Col, Row, Typography } from "antd"
import React from "react"
import { OnDragEndResponder } from "react-beautiful-dnd"
import DraggableList from "../../../core/common/component/draggable-list/DraggableList"
import { IMactchSequence } from "../../../interface/program-interface"
import './matchsequence.scss';

interface IMatchSequenceProps {
    items: IMactchSequence[],
    onDragEnd: OnDragEndResponder,
}
const MatchSequenceItem = React.memo(({ item }: { item: IMactchSequence }) => {
    return (<>
        <Col span={24}>
            <Card size="small" className="matching_sequence--item">
                {item.content}
            </Card>
        </Col>
    </>);
});

MatchSequenceItem.displayName = 'MatchSequenceItem';


export const MatchSequence = React.memo(({ items, onDragEnd }: IMatchSequenceProps) => {
    return (<>
        <Typography className="mb-medium">Let arrange belows into right index.</Typography>
        <DraggableList items={items} component={MatchSequenceItem} onDragEnd={onDragEnd} />
    </>)
})