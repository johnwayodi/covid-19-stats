import React, { FC, useCallback, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { Area, AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { DailyReport } from '../models/interfaces';

import styles from './WeekTrendChart.module.scss';

interface Props {
  loading: boolean;
  weekSummary: DailyReport[];
}

const { Text } = Typography;

const WeekTrendChart: FC<Props> = ({ loading, weekSummary }) => {
  const generateChart = useCallback(() => {
    console.log('WEEK SUMMARY', weekSummary);
  }, [weekSummary]);

  useEffect(() => {
    generateChart();
  }, [generateChart]);

  return (
    <Card className={styles.chart} loading={loading} title={<Text>Last 7 Days</Text>}>
      <ResponsiveContainer width="100%" height={600}>
        <AreaChart width={600} height={250} data={weekSummary} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eeb902" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#eeb902" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorReco" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#317b22" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#317b22" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f25c54" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f25c54" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="confirmed" stroke="#eeb902" fillOpacity={1} fill="url(#colorConf)" />
          <Area type="monotone" dataKey="recovered" stroke="#317b22" fillOpacity={1} fill="url(#colorReco)" />
          <Area type="monotone" dataKey="deaths" stroke="#f25c54" fillOpacity={1} fill="url(#colorDea)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WeekTrendChart;
