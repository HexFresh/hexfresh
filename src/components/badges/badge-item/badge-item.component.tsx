import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { memo } from "react";
import { IBadge } from "../../../store/badge/badge-interface";

export const BadgeItem = memo(({badge}:{badge: IBadge})=>{
  return <Card
  style={{
    width: 300,
  }}
  cover={
    <img
      alt="badge"
      src={badge?.image}
    />
  }
  // actions={[
  //   <SettingOutlined key="setting" />,
  //   <EditOutlined key="edit" />,
  //   <EllipsisOutlined key="ellipsis" />,
  // ]}
>
  <Meta
    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
    title={badge?.title}
    description={<Typography.Text ellipsis={true} >{badge?.description}</Typography.Text>}
  />
</Card>;
});

BadgeItem.displayName='BadgeItem';