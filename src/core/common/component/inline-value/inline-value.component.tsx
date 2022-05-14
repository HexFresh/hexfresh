import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";

export const InlineValue = React.memo(({ title, value }: { title: string, value: any }) => {
  return <Row>
    <Col span={6}>
      <Title level={5}>{title}</Title>
    </Col>
    <Col span={18}>
      {value}
    </Col>
  </Row>
});

InlineValue.displayName = 'InlineValue';
