import React from "react";
import Chart from "react-google-charts";

export default function DonutChart(props: any) {
  const {options, data} = props;
  return (<Chart
    chartType="PieChart"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />);
}