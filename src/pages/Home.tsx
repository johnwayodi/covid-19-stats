import React, { FC, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Dispatch } from '../models/dispatch';

import SearchBar from '../components/SearchBar';
import CountryTable from '../components/CountryTable';

import styles from './Home.module.scss';
import { GlobalState, CountrySummary } from '../models/interfaces';

interface Props {
  loading: boolean;
  globalSummary: GlobalState;
  countries: CountrySummary[];
  countrySearch: CountrySummary[];
  lastUpdated: string;
  getSummary: () => void;
  viewCountryDetails: (slug: string) => void;
  filterCountries: (name: string) => void;
  sortCountries: (key: string) => void;
}

export const Home: FC<Props> = (props) => {
  const { getSummary } = props;

  const getSummaryCB = useCallback(() => {
    getSummary();
  }, [getSummary]);

  useEffect(() => {
    getSummaryCB();
  }, [getSummaryCB]);

  return (
    <Layout className={styles.page}>
      <SearchBar
        countries={props.countrySearch}
        filterCountries={props.filterCountries}
        sortCountries={props.sortCountries}
      />
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

  sortCountries: (key: string) => {
    dispatch({ type: 'global/sortCountries', payload: { key } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
