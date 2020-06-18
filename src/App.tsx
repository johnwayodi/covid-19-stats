import React, { FC } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Redirect, Route, routerRedux, Switch } from 'dva/router';
import { Dispatch } from './models/dispatch';

import Home from './pages/Home';
import Country from './components/Country';
import NavBar from './components/NavBar';

import styles from './App.module.scss';

interface Props {
  app: any;
  history: any;
  global: any;
}

const { Header, Content } = Layout;
const { ConnectedRouter } = routerRedux;

const App: FC<Props> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout className={styles.container}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
          <NavBar />
        </Header>
        <Content className={styles.content}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/summary" push />} />
            <Route exact path="/summary" render={() => <Home />} />
            <Route exact path="/summary/:slug" render={() => <Country />} />
          </Switch>
        </Content>
      </Layout>
    </ConnectedRouter>
  );
};

const mapStateToProps = ({ global }: any) => ({ global });

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
