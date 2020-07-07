import React, { FC, useEffect } from 'react';
import { Layout, Row, Typography } from 'antd';
import { connect } from 'dva';
import { split } from 'lodash';
import { Dispatch } from '../models/dispatch';
import { DailyReport } from '../models/interfaces';
import { CountryLatestNumbers, CountryTotalNumbers, CountryTimeline, MonthTrendChart } from '../components';

import styles from './Country.module.scss';

interface Props {
  countryName: string;
  monthSummary: DailyReport[];
  countryUrl: string;
  loading: boolean;
  getMonthSummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ countryName, countryUrl, getMonthSummary, loading, monthSummary }) => {
  useEffect(() => {
    const [, , slug] = split(countryUrl, '/', 3);
    if (slug) {
      getMonthSummary(slug);
    }
  }, [countryUrl, getMonthSummary]);

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
          <MonthTrendChart loading={loading} monthSummary={monthSummary} />
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
  monthSummary: country.monthSummary,
  countryUrl: routing.location.pathname,
  loading: loading.effects['country/fetchMonthSummary'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMonthSummary: (slug: string) => {
    dispatch({ type: 'country/fetchMonthSummary', payload: { slug } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
