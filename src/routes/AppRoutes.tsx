import { Switch } from 'dva/router';
import React, { Component } from 'react';

import { RouteConfig, routes } from './config';
import RouteWithSubRoutes from './RouteWithSubRoutes';

interface InternalProps {
  app: any;
}

class AppRoutes extends Component<InternalProps> {
  public render() {
    const { app } = this.props;

    return (
      <Switch>
        {routes.map((route: RouteConfig) => (
          <RouteWithSubRoutes key={route.path} app={app} {...route} />
        ))}
      </Switch>
    );
  }
}

export default AppRoutes;
