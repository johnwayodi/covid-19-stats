import React, { FC } from 'react';
import { Card, Typography } from 'antd';

import styles from './CountryLatestNumbers.module.scss';

const { Text } = Typography;
interface Props {
  loading: boolean;
}

const CountryLatestNumbers: FC<Props> = ({ loading }) => {
  return <Card className={styles.item} loading={loading} title={<Text>Latest Numbers</Text>}></Card>;
};

export default CountryLatestNumbers;
