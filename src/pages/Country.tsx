import React, { FC, useEffect, useState } from 'react';
import { Layout, Row, Typography } from 'antd';
import { connect } from 'dva';
import { split } from 'lodash';
import { Dispatch } from '../models/dispatch';
import { CountrySummary, DailyReport } from '../models/interfaces';
import { CountryLatestNumbers, CountryTotalNumbers, MonthTrendChart } from '../components';

import styles from './Country.module.scss';

interface Props {
  countryName: string;
  monthSummary: DailyReport[];
  countryUrl: string;
  countries: CountrySummary[];
  loading: boolean;
  getMonthSummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ countryName, countryUrl, getMonthSummary, loading, monthSummary, countries }) => {
  const [slug] = useState(split(countryUrl, '/', 3)[2]);
  const [countryInfo, setCountryInfo] = useState<any>();
  useEffect(() => {
    if (slug) {
      getMonthSummary(slug);
    }
  }, [slug, getMonthSummary]);

  useEffect(() => {
    if (slug && countries.length) {
      const country = countries.find((element) => element.slug === slug);
      setCountryInfo(country);
    }
  }, [slug, countries]);

  return (
    <Layout className={styles.page}>
      <Row className={styles.title}>
        <Title level={4}>{countryName}</Title>
      </Row>
      <Row className={styles.details}>
        <Row className={styles.numbers}>
          <CountryLatestNumbers loading={loading} data={countryInfo} />
          <CountryTotalNumbers loading={loading} data={countryInfo} />
        </Row>
        <Row className={styles.trend}>
          <MonthTrendChart loading={loading} monthSummary={monthSummary} />
        </Row>
      </Row>
    </Layout>
  );
};

const mapStateToProps = ({ country, global, loading, routing }: any) => ({
  countrySlug: country.countrySlug,
  countryName: country.countryName,
  monthSummary: country.monthSummary,
  countries: global.countries,
  countryUrl: routing.location.pathname,
  loading: loading.effects['country/fetchMonthSummary'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMonthSummary: (slug: string) => {
    dispatch({ type: 'global/fetchSummary' });
    dispatch({ type: 'country/fetchMonthSummary', payload: { slug } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
