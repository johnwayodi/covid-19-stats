import dva, { onActionFunc } from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory } from 'history';
import React from 'react';
import { createLogger } from 'redux-logger';
import { __DEV__ } from './env';
import { Global, Country } from './models';
import App from './App';

import './index.scss';

// Dva middleware
const middleware: onActionFunc[] = [];

// Only development env need to have redux logger
if (__DEV__) {
  middleware.push(createLogger());
}

const app: any = dva({
  history: createBrowserHistory(),

  onError(error: any) {
    // Catch redux action errors
    error.preventDefault();
    console.error(error.message);
  },

  onAction: middleware,
});

app.use(createLoading());

app.router((props: any) => <App {...props} />);

// Register dva global model
app.model(Global);
app.model(Country);

app.start('#root');
