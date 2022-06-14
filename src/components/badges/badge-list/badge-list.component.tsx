import { memo } from "react";
import { map } from "lodash";

import { IBadge } from "../../../store/badge/badge-interface";
import { BadgeItem } from "../badge-item/badge-item.component";

import './badge-list.component.scss';
import { Grid } from "@mui/material";
import { Pagination } from "antd";
import { DEFAULT_PAGE_SIZE } from "../../../constant";

export const BadgeList = memo(({
  badges,
  page,
  count,
}: {
  badges: IBadge[],
  page: number,
  count: number
}) => {
  return <>
    <div className="badges__container">
      <div className="programs">
      
          <div className="programs__container">
            <Grid container spacing={2}>
              {map(badges,(badge: any) => {
                return (<Grid key={badge.id} item xs={12} sm={6} lg={2}>
                 <BadgeItem badge={badge}/>
                </Grid>);
              })}
            </Grid>
          </div>
      </div>
      <div className="pagination">
        <Pagination current={page} total={count} pageSize={DEFAULT_PAGE_SIZE} onChange={()=>{}} hideOnSinglePage />
      </div>
    </div>
  </>
});

BadgeList.displayName = 'BadgeList';