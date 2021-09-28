import React, { FC, useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Dispatch } from '../models/dispatch';

import { CountryTable } from '../components';
import { GlobalState, CountrySummary } from '../models/interfaces';

import styles from './Home.module.scss';

interface Props {
  loading: boolean;
  globalSummary: GlobalState;
  countries: CountrySummary[];
  countrySearch: CountrySummary[];
  lastUpdated: string;
  getSummary: () => void;
  viewCountryDetails: (code: string) => void;
  filterCountries: (name: string) => void;
  sortCountries: (key: string) => void;
  enableSort: () => void;
}

export const Home: FC<Props> = (props) => {
  const { getSummary, enableSort } = props;

  useEffect(() => {
    getSummary();
    enableSort();
  }, [getSummary, enableSort]);

  return (
    <Layout className={styles.page}>
      <CountryTable countries={props.countries} loading={props.loading} viewCountryDetails={props.viewCountryDetails} />
    </Layout>
  );
};

const mapStateToProps = ({ global, loading }: any) => ({
  globalSummary: global.summary,
  countries: global.countries,
  countrySearch: global.searchResults,
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
  filterCountries: (name: string) => {
    dispatch({ type: 'global/searchCountry', payload: { name } });
  },
  enableSort: () => {
    dispatch({ type: 'country/activateSort', payload: {} });
  },
  sortCountries: (key: string) => {
    dispatch({ type: 'global/sortCountries', payload: { key } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
