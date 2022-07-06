import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

export const InlineValue = React.memo(({ title, value }: { title: string, value: any }) => {
  return <Row className="mb-medium">
    <Col span={6}>
      <Title level={5}>{title}</Title>
    </Col>
    <Col span={18} style={{textAlign:'justify'}}>
      {value}
    </Col>
  </Row>
});

InlineValue.displayName = 'InlineValue';
