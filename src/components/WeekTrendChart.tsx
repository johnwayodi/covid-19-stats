import React, { FC, useEffect, useState } from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/charts';
import { WeekTrendChartType } from '../models/interfaces';

import styles from './WeekTrendChart.module.scss';

interface Props {
  loading: boolean;
  weekTrendStats: WeekTrendChartType[];
}

const WeekTrendChart: FC<Props> = ({ loading, weekTrendStats }) => {
  const [data, setData] = useState<WeekTrendChartType[]>([]);
  useEffect(() => {
    if (weekTrendStats.length) {
      setData(weekTrendStats);
    }
  }, [weekTrendStats]);

  const config: any = {
    height: 300,
    title: {
      visible: true,
      alignTo: 'left',
      text: 'Latest Trend',
    },
    description: {
      visible: true,
      text: 'Trend in the last 7 days',
    },
    padding: 'auto',
    forceFit: true,
    data,
    xField: 'date',
    yField: 'value',
    yAxis: { label: { formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) } },
    legend: { position: 'right-top' },
    seriesField: 'type',
    color: (d: any) => {
      return d === 'register' ? '#93D072' : '#2D71E7';
    },
    responsive: true,
  };
  return (
    <Card className={styles.chart} loading={loading}>
      <Line {...config} />
    </Card>
  );
};

export default WeekTrendChart;
