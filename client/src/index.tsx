import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './router';
import * as serviceWorker from './serviceWorker';

// 创建apollo客户端
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

const username = localStorage.getItem('username');
// 本地缓存数据
client.cache.writeData({
  data: {
    isLogin: localStorage.getItem('token') ? true : false,
    userName: username ? username : ''
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
serviceWorker.unregister();
