import React, { FC } from 'react';
import { Card, Typography } from 'antd';

import styles from './CountryTotalNumbers.module.scss';

const { Text } = Typography;
interface Props {
  loading: boolean;
}

const CountryTotalNumbers: FC<Props> = ({ loading }) => {
  return <Card className={styles.item} loading={loading} title={<Text>Total Numbers</Text>}></Card>;
};

export default CountryTotalNumbers;
