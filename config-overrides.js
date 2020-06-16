/* config-overrides.js */
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

const reactHotLoader = require('react-app-rewire-hot-loader');

// Override Webpack default config
module.exports = override(
  fixBabelImports('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: false,
  }),
  fixBabelImports('lodash', {
    libraryName: 'lodash',
    libraryDirectory: '',
    camel2DashComponentName: false, // default: true
  }),
  addWebpackAlias({
    ['react-dom']: '@hot-loader/react-dom',
  }),
  // React hot loader
  reactHotLoader,
);
