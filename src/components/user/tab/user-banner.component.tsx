import { memo } from "react";

export const UserBanner = memo(({
  firstName,
  lastName,
  email,
}:{
  firstName: string,
  lastName: string,
  email: string,
})=>{
  return <div className="card-body">
  <div className="cover-img">
    <div className="card__infor">
      <div className="avatar">
        <img
          src={/* userProfile?.avatar */ 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}
          alt="avt"
        />
      </div>
      <div className="card-body__right">
        <div className="card-body__right__name">{firstName + ' ' +  lastName}</div>
        <div className="card-body__right__email">{email}</div>
      </div>
    </div>
  </div>
</div>
});

UserBanner.displayName = 'UserBanner';