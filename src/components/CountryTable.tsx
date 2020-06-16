import React, { FC, useState, useEffect, useCallback } from 'react';
import { Table, Typography } from 'antd';
import { forEach } from 'lodash';
import { CountrySummary } from '../models/global';

import styles from './CountryTable.module.scss';

interface Props {
  loading: boolean;
  countries: CountrySummary[];
}

interface TableItem extends CountrySummary {
  key: string;
}

const { Paragraph } = Typography;

const columns = [
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: (text: string) => <Paragraph className={styles.countryName}>{text}</Paragraph>,
  },
  {
    title: 'New Cases',
    dataIndex: 'newConfirmed',
    key: 'newConfirmed',
  },
  {
    title: 'New Recovered',
    dataIndex: 'newRecovered',
    key: 'newRecovered',
  },
  {
    title: 'New Deaths',
    dataIndex: 'newDeaths',
    key: 'newDeaths',
  },
  {
    title: 'Total Cases',
    dataIndex: 'totalConfirmed',
    key: 'totalConfirmed',
  },
  {
    title: 'Total Recovered',
    dataIndex: 'totalRecovered',
    key: 'totalRecovered',
  },
  {
    title: 'Total Deaths',
    dataIndex: 'totalDeaths',
    key: 'totalDeaths',
  },
];

export const CountryTable: FC<Props> = ({ countries, loading }) => {
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
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            event.preventDefault();
            console.log('ROW INDEX', rowIndex);
            console.log('COUNTRY', record);
          }, // click row
          onDoubleClick: (event) => {}, // double click row
          onContextMenu: (event) => {}, // right button click row
          onMouseEnter: (event) => {}, // mouse enter row
          onMouseLeave: (event) => {}, // mouse leave row
        };
      }}
      className={styles.countryList}
      columns={columns}
      dataSource={tableItems}
      loading={loading}
    />
  );
};
