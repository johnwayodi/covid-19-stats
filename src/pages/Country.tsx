import React, { FC, useEffect, useState } from 'react';
import { Layout, Row, Typography } from 'antd';
import { connect } from 'dva';
import { Dispatch } from '../models/dispatch';
import { CountrySummary, DailyReport } from '../models/interfaces';
import { CountryLatestNumbers, CountryTotalNumbers, MonthTrendChart } from '../components';

import styles from './Country.module.scss';

interface Props {
  slug: string;
  countryName: string;
  monthSummary: DailyReport[];
  countryUrl: string;
  countries: CountrySummary[];
  loading: boolean;
  getMonthSummary: (slug: string) => void;
}

const { Title } = Typography;

const Country: FC<Props> = ({ slug, countryName, countryUrl, getMonthSummary, loading, monthSummary, countries }) => {
  // const [slug, setSlug] = useState(split(countryUrl, '/', 3)[2]);
  const [countryInfo, setCountryInfo] = useState<any>();
  useEffect(() => {
    if (countryUrl) {
      getMonthSummary(countryUrl);
    }
  }, [countryUrl, getMonthSummary]);

  // useEffect(() => {
  //   const selectedSlug = split(countryUrl, '/', 3)[2];
  //   if (selectedSlug !== slug) {
  //     getMonthSummary(selectedSlug);
  //   }
  // }, [countryUrl, slug, getMonthSummary]);

  useEffect(() => {
    if (slug && countries.length) {
      const country = countries.find((element) => element.slug === slug);
      console.log('COUNTRY', country);
      setCountryInfo(country);
    }
  }, [slug, countries]);

  return (
    <Layout className={styles.page}>
      <div className={styles.detailSection}>
        <div className={styles.infoSection}>
          <Row className={styles.title}>
            <Title level={4}>{countryName}</Title>
            <div className={styles.flag}>
              {countryInfo && (
                <img
                  src={'https://www.countryflags.io/' + countryInfo.countryCode + '/flat/64.png'}
                  loading="eager"
                  width="124"
                  height="124"
                  alt={countryInfo.countryCode}
                />
              )}
            </div>
          </Row>
        </div>
        <div className={styles.numbersSection}>
          <Row className={styles.details}>
            <Row className={styles.numbers}>
              <CountryLatestNumbers loading={loading} data={countryInfo} />
              <CountryTotalNumbers loading={loading} data={countryInfo} />
            </Row>
          </Row>
        </div>
      </div>
      <Row className={styles.trend}>
        <MonthTrendChart loading={loading} monthSummary={monthSummary} />
      </Row>
    </Layout>
  );
};

const mapStateToProps = ({ country, global, loading, routing }: any) => ({
  slug: country.countrySlug,
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
