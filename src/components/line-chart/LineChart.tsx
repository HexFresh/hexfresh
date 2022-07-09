import React from 'react';
import {Chart} from "react-google-charts";

export default function LineChart(props: any) {
  const {options, data} = props;
  return (<Chart
    chartType="LineChart"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />);
}
