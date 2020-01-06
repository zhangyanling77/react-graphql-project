import React, { useEffect, useState, memo } from 'react';
import { Layout, Menu, Divider  } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import LoginForm from '@/components/login';
import { GET_LOGINSTATUS } from '@/api';
import { useQuery } from '@apollo/react-hooks';

const { Header, Content, Footer } = Layout

const Layouts: React.FC = (props:any) => {
  let [selectKey, setSelectKey] = useState<string>('/');
  let [loginStatus, setLoginStatus] = useState<boolean>(false);
  // console.log(props)
  let path = props.location.pathname;
  let history = props.history;
  const { data } = useQuery(GET_LOGINSTATUS);
  const userInfo = JSON.parse(localStorage.getItem('userinfo') as string);

  useEffect(()=> {
    setSelectKey(path)
  }, [path])
  
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          selectedKeys={[selectKey]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/"><Link to="/">商品管理</Link></Menu.Item>
          <Menu.Item key="/profile"><Link to="/profile">个人中心</Link></Menu.Item>
        </Menu>
        <div style={{position:'absolute', right: 50, top: 0}}>
          {!data.isLogin ? <a onClick={() => setLoginStatus(true)}>登录</a> : <img 
          alt="header" 
          style={{width: 40, height: 40, borderRadius: '50%'}} 
          src={userInfo.avatar} />}
          {/* <Divider type="vertical" />
          <a>注册</a> */}
          {userInfo && <span style={{color:'white', fontSize: 18, margin: '0 10px'}}>{userInfo.username}</span>}
        </div>
      </Header>
      <Content style={{ padding: '50px 50px 0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2019 Created by zhangyanling. </Footer>
      {loginStatus && <LoginForm history={history} closeForm={() => setLoginStatus(false)}/>}
    </Layout>
  )  
}

export default withRouter(memo(Layouts));
