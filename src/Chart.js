import React, { useState, useEffect } from 'react';
import { ChartJS } from 'chart.js';

const Chart = ({ id, type, data, options = {} }) => {
  const [chartRef] = useState(React.createRef());
  const [chart, setChart] = useState({});
  const [chartData] = useState(data);
  const [chartOptions] = useState(options);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    const newChart = new ChartJS(myChartRef, {
      type,
      data: chartData,
      options: chartOptions,
    });
    setChart(newChart);
  }, [chartRef, type, chartData, chartOptions]);

  useEffect(() => {
    chart.data = data;
    if (chart.update) chart.update();
  }, [chart, data]);

  useEffect(() => {
    chart.options = options;
    if (chart.update) chart.update();
  }, [chart, options]);

  return <canvas id={id} ref={chartRef} />;
};

export default Chart;
