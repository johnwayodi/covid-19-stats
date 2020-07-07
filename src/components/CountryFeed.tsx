import React, { FC } from 'react';
import { Card, Timeline, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './CountryFeed.module.scss';

interface Props {
  loading: boolean;
}

const { Text } = Typography;
const CountryTimeline: FC<Props> = ({ loading }) => {
  return (
    <Card className={styles.timeline} loading={loading} title={<Text>Daily Report</Text>}>
      <Timeline>
        <Timeline.Item>Feed 1</Timeline.Item>
        <Timeline.Item>Feed 2</Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
          Feed 3
        </Timeline.Item>
        <Timeline.Item>Feed 4</Timeline.Item>
      </Timeline>
    </Card>
  );
};

export default CountryTimeline;
