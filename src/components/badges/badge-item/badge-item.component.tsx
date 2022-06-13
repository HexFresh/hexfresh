import { memo } from "react";
import { Tooltip } from "antd";

import { IBadge } from "../../../store/badge/badge-interface";

export const BadgeItem = memo(({badge}:{badge: IBadge})=>{
  return  <div className="program">
  <div className="cover-photo">
    <img
      src={badge.image}
      alt="img"
    />
    <Tooltip className={"remove-btn"} title="remove" />
  </div>
  <div className="program-name">
    <div className="program-title">
      {badge.title}
    </div>
    <div className="program-description">
      {badge.description}
    </div>
  </div>
</div>
});

BadgeItem.displayName='BadgeItem';