import React, { FC, useEffect, useCallback, useState } from 'react';
import { Typography, Layout } from 'antd';
import { connect } from 'dva';
import { split } from 'lodash';
import { Dispatch } from '../models/dispatch';

import styles from './Country.module.scss';
import { CountryDailyStat } from '../models/global';

interface Props {
  countryStats: CountryDailyStat[];
  countryUrl: string;
  getCountrySummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ countryStats, countryUrl, getCountrySummary }) => {
  const [name, setName] = useState<string>('');

  const loadData = useCallback(() => {
    const [, , slug] = split(countryUrl, '/', 3);
    getCountrySummary(slug);
  }, [countryUrl, getCountrySummary]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (countryStats.length) {
      setName(countryStats[0].country);
    }
  }, [countryStats, setName]);

  return (
    <Layout className={styles.page}>
      <Title>{name}</Title>
    </Layout>
  );
};

const mapStateToProps = ({ global, routing, loading }: any) => ({
  countryStats: global.countrySummary,
  countryUrl: routing.location.pathname,
  loading: loading.effects['global/fetchSummary'] || loading.effects['global/sortCountries'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCountrySummary: (slug: string) => {
    dispatch({ type: 'global/fetchCountrySummary', payload: { slug } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
