import React, { FC, useEffect, useCallback } from 'react';
import { Layout, Row, Typography } from 'antd';
import { connect } from 'dva';
import { split } from 'lodash';
import { Dispatch } from '../models/dispatch';
import { WeekTrendChartType } from '../models/interfaces';
import WeekTrendChart from '../components/WeekTrendChart';

import styles from './Country.module.scss';

interface Props {
  countrySlug: string;
  countryName: string;
  weekTrendStats: WeekTrendChartType[];
  countryUrl: string;
  loading: boolean;
  getWeekSummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ countryName, countryUrl, getWeekSummary, loading, weekTrendStats }) => {
  const loadData = useCallback(() => {
    const [, , slug] = split(countryUrl, '/', 3);
    getWeekSummary(slug);
  }, [countryUrl, getWeekSummary]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Layout className={styles.page}>
      <Row className={styles.title}>{countryName && <Title level={3}>{countryName}</Title>}</Row>
      <WeekTrendChart weekTrendStats={weekTrendStats} loading={loading} />
    </Layout>
  );
};

const mapStateToProps = ({ country, loading, routing }: any) => ({
  countrySlug: country.countrySlug,
  countryName: country.countryName,
  weekTrendStats: country.weekTrendStats,
  countryUrl: routing.location.pathname,
  loading: loading.effects['country/fetchWeekSummary'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWeekSummary: (slug: string) => {
    dispatch({ type: 'country/fetchWeekSummary', payload: { slug } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
