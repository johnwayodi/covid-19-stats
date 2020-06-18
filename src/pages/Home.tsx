import React, { FC, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Dispatch } from '../models/dispatch';
import { GlobalState, CountrySummary } from '../models/global';

import SearchBar from '../components/SearchBar';
import CountryTable from '../components/CountryTable';

import styles from './Home.module.scss';

interface Props {
  loading: boolean;
  globalSummary: GlobalState;
  countries: CountrySummary[];
  lastUpdated: string;
  getSummary: () => void;
  viewCountryDetails: (slug: string) => void;
}

export const Home: FC<Props> = ({ countries, getSummary, loading, viewCountryDetails }) => {
  const getSummaryCB = useCallback(() => {
    getSummary();
  }, [getSummary]);

  useEffect(() => {
    getSummaryCB();
  }, [getSummaryCB]);

  return (
    <Layout className={styles.page}>
      <SearchBar />
      <CountryTable countries={countries} loading={loading} viewCountryDetails={viewCountryDetails} />
    </Layout>
  );
};

const mapStateToProps = ({ global, loading }: any) => ({
  globalSummary: global.summary,
  countries: global.countries,
  lastUpdated: global.date,
  loading: loading.effects['global/fetchSummary'] || loading.effects['global/sortCountries'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getSummary: () => {
    dispatch({ type: 'global/fetchSummary' });
  },
  viewCountryDetails: (slug: string) => {
    dispatch(routerRedux.push(`/summary/${slug}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
