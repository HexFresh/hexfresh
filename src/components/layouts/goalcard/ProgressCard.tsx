import React from 'react'
import {Card, Progress} from 'antd'
import 'antd/dist/antd.css';
import './ProgressCard.scss'
import Title from 'antd/lib/typography/Title';
import { useSelector } from 'react-redux';
import { IRootStore } from '../../../store/store';
const ProgressCard = () => {
  const program = useSelector((state:IRootStore)=> state.programStore?.program);

  return (
    <div className='progress-card'>
      <Card  bordered={true} className='bg-glassmorphism border-card'>
        <Title className='txt-color-white' level={4}>Your progress</Title>
        <div className="planet-progress">
        <div className="img">
          <img src="https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-09_jvied4.png" alt="your planet" />
        </div>
        <Progress percent={program?.completedPercentage*100} size={'default'} strokeColor={'yellow'} status="active" />
        </div>
      </Card>
    </div>
  )
}

export default ProgressCard