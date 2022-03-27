import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const EmptyResult =({message}:{message:string})=>{
  return<Result
  icon={<SmileOutlined />}
  title={message}
  /* extra={<Button type="primary">Next</Button>} */
/>
};
