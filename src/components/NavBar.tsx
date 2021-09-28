import React, { FC } from 'react';
import { Row, Typography } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import {} from '@ant-design/icons';
import { GlobalState, CountrySummary } from '../models/interfaces';
import { Dispatch } from '../models/dispatch';

import { SearchBar } from './index';

import styles from './NavBar.module.scss';

const { Title } = Typography;

interface Props {
  loading: boolean;
  globalSummary: GlobalState;
  countries: CountrySummary[];
  countrySearch: CountrySummary[];
  lastUpdated: string;
  sortVisible: boolean;
  getSummary: () => void;
  viewCountryDetails: (code: string) => void;
  filterCountries: (name: string) => void;
  sortCountries: (key: string) => void;
}

const NavBar: FC<Props> = (props) => {
  return (
    <Row className={styles.navBar}>
      <Row className={styles.navTitle}>
        <Link to="/summary">
          <Title level={4}>Coronavirus Statistics (COVID-19)</Title>
        </Link>
      </Row>
      <SearchBar
        countries={props.countrySearch}
        sortVisible={props.sortVisible}
        filterCountries={props.filterCountries}
        viewSelected={props.viewCountryDetails}
        sortCountries={props.sortCountries}
      />
    </Row>
  );
};

const mapStateToProps = ({ global, country, loading }: any) => ({
  globalSummary: global.summary,
  countries: global.countries,
  countrySearch: global.searchResults,
  lastUpdated: global.date,
  sortVisible: country.sortVisible,
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
