# react-graphql-project

## 项目背景
源于2019年11月16日成都Web全栈大会上尹吉峰老师的GraphQL的分享，让我产生了浓厚的兴趣。几经研究、学习，做了个实践的小项目。<br />

学习资料：<br />
https://graphql.cn/learn/
https://typescript.bootcss.com/basic-types.html
https://www.apollographql.com/docs/react/

## 项目使用技术栈
* 前端：
react hooks + typescript + apollo + graphql + antd
* 后端：
koa2 + graphql + koa-graphql + mongoose
* 数据库：
mongodb

## 项目搭建及源码实现
* 数据库部分：
使用的是mongodb数据库，这里对于该数据库的安装等不做赘述。

默认已经 具备mongodb的环境。启动数据库。

到mongodb安装路径下，如C:\Program Files\MongoDB\Server\4.2\bin

打开终端，执行命令：
```bash
  mongod --dbpath=./data
```
* 创建项目总目录：
```bash
  mkdir react-graphql-project && cd react-graphql-project
```
* 后端部分：
- 1）创建项目
```bash
  mkdir server && cd server
  npm init -y
```
- 2）安装项目依赖
```bash
  yarn add koa koa-grphql koa2-cors koa-mount koa-logger graphql
```
- 3）配置启动命令
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
    "koa": "^2.11.0",
    "koa-graphql": "^0.8.0",
    "koa-logger": "^3.2.1",
    "koa-mount": "^4.0.0",
    "koa2-cors": "^2.0.6",
    "mongoose": "^5.7.11"
  }
}
```
- 4）业务开发
index.js
```javascript
const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const cors = require('koa2-cors'); // 解决跨域
const logger = require('koa-logger'); // 日志输出
const myGraphQLSchema = require('./schema');

const app = new Koa();

app.use(logger())

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS']
}))

app.use(mount('/graphql', graphqlHTTP({
  schema: myGraphQLSchema,
  graphiql: true // 开启graphiql可视化操作ide
})))

app.listen(4000, () => {
  console.log('server started on 4000')
})
```
model.js
```javascript
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// 创建数据库连接
const conn = mongoose.createConnection('mongodb://localhost/graphql',{ useNewUrlParser: true, useUnifiedTopology: true });

conn.on('open', () => console.log('数据库连接成功！'));

conn.on('error', (error) => console.log(error));

// 用于定义表结构
const CategorySchema = new Schema({
  name: String
});
// 增删改查
const CategoryModel = conn.model('Category', CategorySchema);

const ProductSchema = new Schema({
  name: String,
  category: {
    type: Schema.Types.ObjectId, // 外键
    ref: 'Category'  
  }
});

const ProductModel = conn.model('Product', ProductSchema);

module.exports = {
  CategoryModel,
  ProductModel
}
```
schema.js
```javascript
const graphql = require('graphql');
const { CategoryModel, ProductModel } = require('./model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
}  = graphql


const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => (
    {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      products: {
        type: new GraphQLList(Product),
        async resolve(parent){
          let result = await ProductModel.find({ category: parent.id })
          return result
        }
      }
    }
  )
})

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => (
    {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      category: {
        type: Category,
        async resolve(parent){
          let result = await CategoryModel.findById(parent.category)
          return result
        }
      }
    }
  )
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getCategory: {
      type: Category,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await CategoryModel.findById(args.id)
        return result
      }
    },
    getCategories: {
      type: new GraphQLList(Category),
      args: {},
      async resolve(parent, args){
        let result = await CategoryModel.find()
        return result
      }
    },
    getProduct: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await ProductModel.findById(args.id)
        return result 
      }
    },
    getProducts: {
      type: new GraphQLList(Product),
      args: {},
      async resolve(parent, args){
        let result = await ProductModel.find()
        return result 
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addCategory: {
      type: Category,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await CategoryModel.create(args)
        return result  
      }
    },
    addProduct: {
      type: Product,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args){
        let result = await ProductModel.create(args)
        return result 
      }
    },
    deleteProduct: {
      type: Product,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args){
        let result = await ProductModel.deleteOne({"_id": args.id})
        return result
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
```
- 5) 启动项目
```bash
yarn start
```
访问 http://localhost:4000/graphql 看到数据库操作playground界面。可进行一系列数据库crud操作.

