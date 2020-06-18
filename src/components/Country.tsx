import React, { FC, useEffect, useCallback } from 'react';
import { Typography, Layout } from 'antd';
import { connect } from 'dva';
import { split } from 'lodash';
import { RouteComponentProps } from 'dva/router';
import { Dispatch } from '../models/dispatch';

import styles from './Country.module.scss';

interface Props extends RouteComponentProps {
  countryUrl: string;
  getCountrySummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ countryUrl, getCountrySummary }) => {
  const loadData = useCallback(() => {
    const [, , slug] = split(countryUrl, '/', 3);
    getCountrySummary(slug);
  }, [countryUrl, getCountrySummary]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Layout className={styles.page}>
      <Title>Country Works</Title>
    </Layout>
  );
};

const mapStateToProps = ({ global, routing, loading }: any) => ({
  countrySummary: global.countrySummary,
  countryUrl: routing.location.pathname,
  loading: loading.effects['global/fetchSummary'] || loading.effects['global/sortCountries'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCountrySummary: (slug: string) => {
    dispatch({ type: 'global/fetchCountrySummary', payload: { slug } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
