import React, { FC } from 'react';
import { Card, Row, Statistic, Typography } from 'antd';

import styles from './CountryTotalNumbers.module.scss';

const { Text } = Typography;
interface Props {
  loading: boolean;
  data: any;
}

const CountryTotalNumbers: FC<Props> = ({ loading, data }) => {
  return (
    <Card className={styles.item} loading={loading} title={<Text>Total Numbers</Text>}>
      <Row className={styles.statItems}>
        <div className={styles.statItem}>
          <Statistic title="Confirmed" value={data && data.totalConfirmed} valueStyle={{ fontSize: '20px' }} />
        </div>
        <div className={styles.statItem}>
          <Statistic title="Recovered" value={data && data.totalRecovered} valueStyle={{ fontSize: '20px' }} />
        </div>
        <div className={styles.statItem}>
          <Statistic title="Deaths" value={data && data.totalDeaths} valueStyle={{ fontSize: '20px' }} />
        </div>
      </Row>
    </Card>
  );
};

export default CountryTotalNumbers;
