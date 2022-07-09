import { Button, Result } from "antd";
import { memo } from "react";

export const PermissionError = memo(()=>{
  return   <Result
  status="403"
  title="You don't have right permission"
  subTitle="Sorry, you are not authorized to access this page."
  extra={<Button type="primary">Back Home</Button>}
/>
})

PermissionError.displayName = 'PermissionError'