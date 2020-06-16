import React, { FC, useCallback, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from '../models/dispatch';
import { GlobalState, CountrySummary } from '../models/global';
import SearchBar from '../components/SearchBar';
import { RouteConfig } from '../routes/config';

import styles from './Home.module.scss';
import { CountryTable } from '../components/CountryTable';
import { Layout } from 'antd';

interface Props {
  app: any;
  routes: RouteConfig[];
  globalSummary: GlobalState;
  countriesSummary: CountrySummary[];
  lastUpdated: string;
  loading: boolean;
  getSummary: () => void;
}

export const Home: FC<Props> = ({ app, routes, globalSummary, countriesSummary, lastUpdated, loading, getSummary }) => {
  const getSummaryCB = useCallback(() => {
    getSummary();
  }, [getSummary]);

  useEffect(() => {
    getSummaryCB();
  }, [getSummaryCB]);

  return (
    <Layout className={styles.page}>
      <SearchBar />
      <CountryTable loading={loading} countries={countriesSummary} />
    </Layout>
  );
};

const mapStateToProps = ({ global, loading }: any) => ({
  globalSummary: global.summary,
  countriesSummary: global.countries,
  lastUpdated: global.date,
  loading: loading.effects['global/fetchSummary'] || loading.effects['global/sortCountries'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getSummary: () => {
    dispatch({ type: 'global/fetchSummary' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
