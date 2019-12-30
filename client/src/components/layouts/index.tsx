import React, { useEffect, useState, memo } from 'react';
import { Layout, Menu, Divider  } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { Header, Content, Footer } = Layout

const Layouts: React.FC = (props:any) => {
  let [selectKey, setSelectKey] = useState<string>('/')
  // console.log(props)
  let path = props.location.pathname;

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
          <a>登录</a>
          <Divider type="vertical" />
          <a>注册</a>
        </div>
      </Header>
      <Content style={{ padding: '50px 50px 0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2019 Created by zhangyanling. </Footer>
    </Layout>
  )  
}

export default withRouter(memo(Layouts));
