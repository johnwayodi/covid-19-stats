import React, { FC } from 'react';
import { Typography, Layout } from 'antd';
import { connect } from 'dva';
import { Dispatch } from '../models/dispatch';

import styles from './Country.module.scss';

// interface Props {
//   loading: boolean;
// }

const { Title } = Typography;
export const Country: FC = () => {
  // const getSummaryCB = useCallback(() => {
  //   getSummary();
  // }, [getSummary]);

  // useEffect(() => {
  //   getSummaryCB();
  // }, [getSummaryCB]);

  return (
    <Layout className={styles.page}>
      <Title>Country Works</Title>
    </Layout>
  );
};

const mapStateToProps = ({ loading }: any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getSummary: () => {
    dispatch({ type: 'global/fetchSummary' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
