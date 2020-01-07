import React from 'react';
import { Row, Col, Card, List, Avatar, Icon } from 'antd';
import { GET_LOGINSTATUS } from '@/api';
import { useQuery } from '@apollo/react-hooks';

const listData:Array<any> = [];
for (let i = 0; i < 6; i++) {
  listData.push({
    title: `代表作 ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

interface IconProps {
  type: string;
  text: string;
}
const IconText:React.FC<IconProps> = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

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
            style={{marginBottom: 20}}
          >
            <h3>姓名: <b>{userinfo.username}</b></h3>
            <h3>地址: <b>{userinfo.address}</b></h3>
          </Card>
          <Card
            title="代表作品"
          >
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={listData}
              footer={null}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                    <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                    <IconText type="message" text="2" key="list-vertical-message" />,
                  ]}
                  extra={
                    <img
                      width={200}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      :<h1>请登录</h1>}
    </>
  )
}

export default Profile;
