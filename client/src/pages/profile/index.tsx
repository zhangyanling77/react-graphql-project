import React from 'react';
import { Row, Col, Card } from 'antd';
import { GET_LOGINSTATUS } from '@/api';
import { useQuery } from '@apollo/react-hooks';

const Profile:React.FC = () => {
  const { data } = useQuery(GET_LOGINSTATUS);
  
  return (
    <>
      {data.isLogin ? <Row>
        <Col span={24}>
          <img 
            alt="header" 
            style={{width: 80, height: 80, borderRadius: '50%', border: '2px solid #1890ff', margin: 15}} 
            src="https://mirror-gold-cdn.xitu.io/168e08be61400b23518?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1" />
          <span style={{fontSize:20, fontWeight: 700}}>一江西流</span>
        </Col>
        <Col span={24}>
          <Card
            title="基本信息"
          >
            <p>name: zhangyanling77</p>
            <p>address: Chengdu</p>
          </Card>
        </Col>
      </Row>:<h1>请登录</h1>}
    </>
  )
}

export default Profile;
