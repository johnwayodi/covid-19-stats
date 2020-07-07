import React, { FC, useEffect } from 'react';
import { Layout, Row, Typography } from 'antd';
import { connect } from 'dva';
import { split } from 'lodash';
import { Dispatch } from '../models/dispatch';
import { DailyReport } from '../models/interfaces';
import { CountryLatestNumbers, CountryTotalNumbers, CountryTimeline, WeekTrendChart } from '../components';

import styles from './Country.module.scss';

interface Props {
  countrySlug: string;
  countryName: string;
  weekSummary: DailyReport[];
  countryUrl: string;
  loading: boolean;
  getWeekSummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ countryName, countryUrl, getWeekSummary, loading, weekSummary }) => {
  useEffect(() => {
    const [, , slug] = split(countryUrl, '/', 3);
    if (slug) {
      getWeekSummary(slug);
    }
  }, [countryUrl, getWeekSummary]);

  return (
    <Layout className={styles.page}>
      <Row className={styles.title}>
        <Title level={4}>{countryName}</Title>
      </Row>
      <Row className={styles.details}>
        <Row className={styles.numbers}>
          <CountryLatestNumbers loading={loading} />
          <CountryTotalNumbers loading={loading} />
        </Row>
        <Row className={styles.trend}>
          <WeekTrendChart loading={loading} weekSummary={weekSummary} />
        </Row>
      </Row>
      <Row className={styles.timeline}>
        <CountryTimeline loading={loading} />
      </Row>
    </Layout>
  );
};

const mapStateToProps = ({ country, loading, routing }: any) => ({
  countrySlug: country.countrySlug,
  countryName: country.countryName,
  weekSummary: country.weekSummary,
  countryUrl: routing.location.pathname,
  loading: loading.effects['country/fetchWeekSummary'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWeekSummary: (slug: string) => {
    dispatch({ type: 'country/fetchWeekSummary', payload: { slug } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
