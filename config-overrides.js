/* config-overrides.js */
const { addExternalBabelPlugin, addWebpackAlias, fixBabelImports, override } = require('customize-cra');

const reactHotLoader = require('react-app-rewire-hot-loader');

// Override Webpack default config
module.exports = override(
  addExternalBabelPlugin('recharts'),
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
