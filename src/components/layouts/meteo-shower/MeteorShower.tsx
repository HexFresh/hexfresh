import React, { Component } from 'react';
import './MeteorShower.scss';

interface IMeteorShowerProps {
  className?: any;
}

export class MeteorShower extends Component<IMeteorShowerProps, any> {


  render() {
    const { className } = this.props;
    return (
      <div>
        <div className="star"></div>
        <div className="meteor-1"></div>
        <div className="meteor-2"></div>
        <div className="meteor-3"></div>
        <div className="meteor-4"></div>
        <div className="meteor-5"></div>
        <div className="meteor-6"></div>
        <div className="meteor-7"></div>
        <div className="meteor-8"></div>
        <div className="meteor-9"></div>
        <div className="meteor-10"></div>
        <div className="meteor-11"></div>
        <div className="meteor-12"></div>
        <div className="meteor-13"></div>
        <div className="meteor-14"></div>
        <div className="meteor-15"></div>

      </div>
    )
  }
}

export default MeteorShower