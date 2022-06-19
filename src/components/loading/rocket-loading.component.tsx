import { Typography } from "antd"

export const RocketLoading = ()=>{
  return <div className="loading" >
  <img src="/gifrocket-rocket.gif" alt="loading rocket" />
  <Typography.Text className="text">Please wait a second...</Typography.Text>
</div>
}