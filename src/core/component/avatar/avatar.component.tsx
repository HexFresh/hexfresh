import { memo, useMemo } from "react";
import { Avatar } from "antd";
import { isEmpty } from "lodash";

import { IUser } from "../../../store/user/user-interface";
import { getFullName } from "../../../store/user/user.service";

import './avatar.style.scss'
import { AVATAR_SYSTEM_SRC } from "../../../constant";

export const CustomAvatar = memo(({
  user,
  isSystem = false,
}: {
  user?: IUser,
  isSystem?: boolean,
}) => {

  if(isEmpty(user) && !isSystem) return null;

  return <div className="custom-avatar">
    {isSystem?<>
      <div className="avatar">
        <Avatar src={AVATAR_SYSTEM_SRC}/>
      </div>
      <div>Hexfresh</div>
    </>:<>
      <div className="avatar">
        {(isEmpty(user?.avatar)) ? 
          <Avatar>{user?.username[ 0 ].toUpperCase()}</Avatar> : 
          <Avatar src={user?.avatar} />}
      </div>
      <div>{getFullName(user)}</div>
    </>
    }
  </div>;
});

CustomAvatar.displayName = 'CustomAvatar'