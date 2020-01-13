const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require('path');

 process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css'
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src/")              
  })
)
