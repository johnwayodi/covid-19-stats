import React, { FC } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Dispatch } from './models/dispatch';
import AppRoutes from './routes/AppRoutes';

import styles from './App.module.scss';
import NavBar from './components/NavBar';

const { Header, Content } = Layout;

interface Props {
  app: any;
  global: any;
  history: any;
}

const App: FC<Props> = (props) => {
  const { app } = props;

  return (
    <Layout className={styles.container}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
        <NavBar />
      </Header>
      <Content className={styles.content}>
        <AppRoutes app={app} />
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ global }: any) => ({ global });

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
