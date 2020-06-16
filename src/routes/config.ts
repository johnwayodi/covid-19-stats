import Home from '../pages/Home';
import Country from '../pages/Country';

export interface RouteConfig {
  name: string;
  path: string;
  query?: string;
  exact?: boolean;

  routes?: RouteConfig[];
  // icon?: IconDefinition | string;
  component?: React.ComponentClass<any, any> | React.FunctionComponent<any>;
  hideInMenu?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/home',
    component: Home,
  },
  {
    name: 'Country',
    path: '/country',
    component: Country,
  },
];
