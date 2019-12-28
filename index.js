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