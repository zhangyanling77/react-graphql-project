import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout

const Layouts: React.FC = (props) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">商品管理</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '50px 50px 0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {props.children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}> ©2019 Created by zhangyanling. </Footer>
  </Layout>
)


export default Layouts;