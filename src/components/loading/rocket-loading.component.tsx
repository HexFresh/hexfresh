import { Typography } from "antd"

export const RocketLoading = ({ className = '' }: { className?: string }) => {
  return <div className={`${className} rocket loading`} >
    <img src="/gifrocket-rocket.gif" alt="loading rocket" />
    <Typography.Text className="text">Please wait a second...</Typography.Text>
  </div>
}