import { connect } from 'dva';
import { Redirect, Route, routerRedux, Switch } from 'dva/router';
import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';

import App from './App';
import { __DEV__ } from './env';
import { Dispatch } from './models/dispatch';

interface Props {
  app: any;
  history: any;
}

const { ConnectedRouter } = routerRedux;

// Global pages router
const Page: FC<Props> = (props) => {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" push />} />
        <Route exact path="/home" render={() => <App />} />
        <Route exact path="/country" render={() => <App />} />
        <Redirect to="/exception/404" />
      </Switch>
    </ConnectedRouter>
  );
};

const mapStateToProps = ({ global }: any) => ({
  auth: global.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch({ type: 'global/logout' });
  },
});

const EnhancedPage = connect(mapStateToProps, mapDispatchToProps)(Page);

export default __DEV__ ? hot(EnhancedPage) : EnhancedPage;
