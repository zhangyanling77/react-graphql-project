### 客户端部分

1）创建项目
```bash
npx create-react-app react-graphql-project --template typescript
```
删除其中无用的文件，以待开发。

2）配置webpack
```bash
yarn add react-app-rewired customize-cra
```
更改package.json文件的scripts启动命令：
```javascript 
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
  }
```
然后在根目录下新建config-overrides.js文件，以做webpack的相关配置。<br/>
安装前端UI组件库antd，并配置按需加载、路径别名支持等。
```bash
yarn add antd babel-plugin-import less less-loader
```
config-overrides.js
```javascript 
const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require('path');

process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addLessLoader({
    javascriptEnabled: true
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src/")              
  })
)
```
因为ts无法识别出别名路径的模块，因此需要配置tsconfig.json。<br/>
新建paths.json
```javascript 
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
更改tsconfig.json
```javascript
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "./src/**/*"
  ],
  "extends": "./paths.json"
}
```
重启项目后生效。

3）安装其他项目依赖
```bash
yarn add graphql apollo-boost @apollo/react-hooks
yarn add react-router-dom @types/react-router-dom
```

## 启动项目
```bash
yarn start
```
## 测试
```bash
yarn test
```
## 构建项目
```bash
yarn build
```
