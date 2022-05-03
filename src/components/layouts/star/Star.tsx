import React, { Component } from 'react';
import './MeteorShower.scss';

interface IMeteorShowerProps {
  className?: any;
}

export class Star extends Component<IMeteorShowerProps, any> {
  render() {
    const { className } = this.props;
    return (
      <div>
        <div className="star"></div>
      </div>
    );
  }
}

export default Star;
