# react-graphql-project

## 项目背景
源于2019年11月16日成都Web全栈大会上尹吉峰老师的GraphQL的分享，让我产生了浓厚的兴趣。再结合珠峰架构的GraphQL公开课学习，几经研究、学习，做了个实践的小项目。<br />

学习资料：<br />
- https://graphql.cn/learn/
- https://typescript.bootcss.com/basic-types.html
- https://www.apollographql.com/docs/react/

## 项目使用技术栈
* 前端：
react hooks + typescript + apollo + graphql + antd
* 后端：
koa2 + graphql + koa-graphql + mongoose
* 数据库：
mongodb

## 项目搭建及源码实现
* 数据库部分：<br/>

使用的是mongodb数据库，这里对于该数据库的安装等不做赘述。

默认已经你已经完具备mongodb的环境。启动数据库。

这里以windows为例：

到mongodb安装路径下，如C:\Program Files\MongoDB\Server\4.2\bin

打开终端，执行命令：
```bash
  mongod --dbpath=./data
```
* 创建项目总目录：
```bash
  mkdir react-graphql-project && cd react-graphql-project
```
* 后端部分：<br/>

1）创建项目
```bash
  mkdir server && cd server
  npm init -y
```
2）安装项目依赖
```bash
  yarn add koa koa-grphql koa2-cors koa-router koa-logger graphql jwt-simple koa-bodyparser
```
3）配置启动命令
package.json文件
```javascript
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "zhangyanling",
  "license": "MIT",
  "dependencies": {
    "graphql": "^14.5.8",
    "jwt-simple": "^0.5.6",
    "koa": "^2.11.0",
    "koa-bodyparser": "^4.2.1",
    "koa-graphql": "^0.8.0",
    "koa-logger": "^3.2.1",
    "koa-mount": "^4.0.0",
    "koa-router": "^7.4.0",
    "koa2-cors": "^2.0.6",
    "mongoose": "^5.7.11"
  }
}
```
4）业务开发

入口文件：index.js

数据库链接，建立模型：model.js

定义数据模型交互：schema.js

5）启动项目
```bash
yarn start
```
访问 http://localhost:4000/graphql 看到数据库操作playground界面。可进行一系列数据库crud操作.

* 前端部分：<br/>

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
4）业务开发

入口文件：index.tsx

路由：router.js
 
类型定义：types.tsx 

布局组件：src/components/layouts

登录组件：src/components/login

定义gql查询语句文件: src/api
 
商品列表组件: src/pages/productList (已经实现商品列表展示、删除商品、新增、修改商品等功能)

新增商品组件： src/pages/productList/add 

修改商品组件： src/pages/productList/update

商品详情组件: src/pages/productDetail (根据ID查询商品详情及其所属商品分类下的所有商品)

个人中心页面：src/pages/profile
