const Koa = require('koa');
// const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const Router = require('koa-router');
const cors = require('koa2-cors'); // 解决跨域
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const jwt = require('jwt-simple');

const myGraphQLSchema = require('./schema');

const app = new Koa();
const router = new Router();
const PORT = 4000;

const secret = 'zyl';
app.use(logger());

app.use(bodyparser());

app.use(cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true // 允许跨域 携带cookie
}));


// app.use(mount('/graphql', graphqlHTTP({
//   schema: myGraphQLSchema,
//   graphiql: true // 开启graphiql可视化操作ide
// })));

// 用户列表
let userList = [
   {
    username: 'admin',
    password: '123456',
    nickname: '一江西流',
    address: '成都',
    avatar: 'https://mirror-gold-cdn.xitu.io/168e08be61400b23518?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1'
  },
  {
    username: 'guest',
    password: '123456',
    nickname: '湖畔余光',
    address: '北京',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }
];
// 当前url
let currentUrl = '';
// 登录
router.post('/login', async ctx => {
  // 登录接口
  let {
    username,
    password
  } = ctx.request.body;
  let user = userList.find(user => user.username === username && user.password === password);

  if (user) {
    let token = jwt.encode({
      username,
      url: currentUrl
    }, secret);

    ctx.body = {
      code: 0,
      data: {
        userinfo: {
          username: user.username,
          nickname: user.nickname,
          address: user.address,
          avatar: user.avatar
        },
        token,
        url: currentUrl
      }
    }
  } else {
    ctx.body = {
      code: 1,
      data: '登录失败，请检查账号密码'
    }
  }
});

router.all('/graphql', graphqlHTTP({
  schema: myGraphQLSchema,
  graphiql: true
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`)
});
