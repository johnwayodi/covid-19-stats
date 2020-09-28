import React, { FC } from 'react';
import { Card, Row, Statistic, Typography } from 'antd';

import styles from './CountryLatestNumbers.module.scss';

const { Text } = Typography;
interface Props {
  loading: boolean;
  data: any;
}

const CountryLatestNumbers: FC<Props> = ({ loading, data }) => {
  return (
    <Card className={styles.item} loading={loading} title={<Text>Latest Numbers</Text>}>
      <Row className={styles.statItems}>
        <div className={styles.statItem}>
          <Statistic title="Confirmed" value={data && data.newConfirmed} valueStyle={{ fontSize: '20px' }} />
        </div>
        <div className={styles.statItem}>
          <Statistic title="Recovered" value={data && data.newRecovered} valueStyle={{ fontSize: '20px' }} />
        </div>
        <div className={styles.statItem}>
          <Statistic title="Deaths" value={data && data.newDeaths} valueStyle={{ fontSize: '20px' }} />
        </div>
      </Row>
    </Card>
  );
};

export default CountryLatestNumbers;
