import React from 'react';
import { Row, Col, Card } from 'antd';
import { GET_LOGINSTATUS } from '@/api';
import { useQuery } from '@apollo/react-hooks';

const Profile:React.FC = () => {
  const { data } = useQuery(GET_LOGINSTATUS);
  let userinfo = JSON.parse(localStorage.getItem('userinfo') as string)
  // console.log(data, userinfo)
  return (
    <>
      {data.isLogin ? 
        userinfo && <Row>
        <Col span={24}>
          <img 
            alt="header" 
            style={{width: 80, height: 80, borderRadius: '50%', border: '2px solid #1890ff', margin: 15}} 
            src={userinfo.avatar} />
          <span style={{fontSize:20, fontWeight: 700}}>{userinfo.nickname}</span>
        </Col>
        <Col span={24}>
          <Card
            title="基本信息"
          >
            <p>name: {userinfo.username}</p>
            <p>address: {userinfo.address}</p>
          </Card>
        </Col>
      </Row>
      :<h1>请登录</h1>}
    </>
  )
}

export default Profile;
