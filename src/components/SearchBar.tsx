import React, { FC, useCallback, useState, useEffect } from 'react';
import { AutoComplete, Select, Row, Typography } from 'antd';
import { connect } from 'dva';
import { Dispatch } from '../models/dispatch';
import { CountrySummary } from '../models/global';

import styles from './SearchBar.module.scss';

interface Props {
  countries: CountrySummary[];
  filterCountries: (name: string) => void;
  sortCountries: (key: string) => void;
}

const { Option } = AutoComplete;
const { Text } = Typography;

const sortOptions = [
  { value: 'newConfirmed', text: 'New Cases' },
  { value: 'newRecovered', text: 'New Recovered' },
  { value: 'newDeaths', text: 'New Deaths' },
  { value: 'totalConfirmed', text: 'Total Cases' },
  { value: 'totalRecovered', text: 'Total Recovered' },
  { value: 'totalDeaths', text: 'Total Deaths' },
];

const SearchBar: FC<Props> = ({ countries, filterCountries, sortCountries }) => {
  const [result, setResult] = useState<CountrySummary[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('');

  const resultCB = useCallback(() => {
    setResult(countries);
  }, [countries, setResult]);

  const filterCB = useCallback(() => {
    filterCountries(searchValue);
  }, [searchValue, filterCountries]);

  const sortCB = useCallback(() => {
    sortCountries(sortKey);
  }, [sortKey, sortCountries]);

  useEffect(() => {
    resultCB();
  }, [resultCB]);

  useEffect(() => {
    filterCB();
  }, [filterCB]);

  useEffect(() => {
    sortCB();
  }, [sortCB]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSort = (value: string) => {
    setSortKey(value);
  };

  return (
    <Row className={styles.searchSection}>
      <Row className={styles.searchBar}>
        <AutoComplete className={styles.searchInput} onSearch={handleSearch} placeholder="Search Country">
          {result.map((result) => (
            <Option key={result.country} value={result.country}>
              {result.country}
            </Option>
          ))}
        </AutoComplete>
      </Row>
      <Row className={styles.sortSection}>
        <Text className={styles.sortText}>Sort By: </Text>
        <Select className={styles.select} defaultValue={sortOptions[5].value} onChange={handleSort}>
          {sortOptions.map((sortOption) => (
            <Option key={sortOption.value} value={sortOption.value}>
              {sortOption.text}
            </Option>
          ))}
        </Select>
      </Row>
    </Row>
  );
};

const mapStateToProps = ({ global, loading }: any) => ({
  countries: global.searchResults,
  loading: loading.effects['global/searchCountry'],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  filterCountries: (name: string) => {
    dispatch({ type: 'global/searchCountry', payload: { name } });
  },

  sortCountries: (key: string) => {
    dispatch({ type: 'global/sortCountries', payload: { key } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);