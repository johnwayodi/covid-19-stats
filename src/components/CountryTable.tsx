import React, { FC, useState, useEffect, useCallback } from 'react';
import { Statistic, Table } from 'antd';
import { forEach } from 'lodash';
import { CountrySummary } from '../models/global';

import styles from './CountryTable.module.scss';

interface Props {
  loading: boolean;
  countries: CountrySummary[];
  viewCountryDetails: (slug: string) => void;
}

interface TableItem extends CountrySummary {
  key: string;
}

const columns = [
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
  {
    title: 'New Cases',
    dataIndex: 'newConfirmed',
    key: 'newConfirmed',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
  {
    title: 'New Recovered',
    dataIndex: 'newRecovered',
    key: 'newRecovered',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
  {
    title: 'New Deaths',
    dataIndex: 'newDeaths',
    key: 'newDeaths',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
  {
    title: 'Total Cases',
    dataIndex: 'totalConfirmed',
    key: 'totalConfirmed',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
  {
    title: 'Total Recovered',
    dataIndex: 'totalRecovered',
    key: 'totalRecovered',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
  {
    title: 'Total Deaths',
    dataIndex: 'totalDeaths',
    key: 'totalDeaths',
    render: (text: string) => <Statistic valueStyle={{ fontSize: 14 }} value={text} />,
  },
];

export const CountryTable: FC<Props> = (props) => {
  const { countries, loading, viewCountryDetails } = props;
  const [tableItems, setTableItems] = useState<TableItem[]>([]);

  const formatTableCB = useCallback(() => {
    let items: TableItem[] = [];

    forEach(countries, (country) => {
      items = [...items, { key: `${items.length + 1}`, ...country }];
    });

    setTableItems(items);
  }, [countries]);

  useEffect(() => {
    formatTableCB();
  }, [formatTableCB]);

  return (
    <Table
      className={styles.countryList}
      columns={columns}
      dataSource={tableItems}
      loading={loading}
      pagination={{
        position: ['bottomLeft'],
        showLessItems: true,
        showSizeChanger: false,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            viewCountryDetails(record.slug);
          },
          onDoubleClick: (event) => {},
          onContextMenu: (event) => {},
          onMouseEnter: (event) => {},
          onMouseLeave: (event) => {},
        };
      }}
    />
  );
};

export default CountryTable;
