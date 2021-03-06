import React, {memo, useState} from 'react';
import { Form, Input, Icon, Button, Modal, message } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';

interface LoginProps {
  closeForm: () => void;
  history: any;
}

interface LoginState {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({closeForm, history}) => {
  let [loginInfo, setloginInfo] = useState<LoginState>({username: '', password: ''});
  const client = useApolloClient();

  const handleSubmit = async () => {
    const response =  await fetch('http://localhost:4000/login', { 
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(loginInfo)
    });
    const result = await response.json();
    let { code, data: { userinfo, url, token } } = result;
    if(code === 0){
      client.writeData({ data: { isLogin: true }})
      message.success('登录成功！');
      localStorage.setItem('token', token)
      localStorage.setItem('userinfo', JSON.stringify(userinfo))
      history.push('/profile')
      closeForm()
    } else {
      message.error(result.data);
    }
  }
  
  return (
    <Modal
      title="登录"
      visible={true}
      onCancel={closeForm}
      maskClosable={false}
      footer={null}
    >
      <Form>
        <Form.Item label="用户名">
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入"
            onChange={event => setloginInfo({...loginInfo, username: event.target.value})}
          />
        </Form.Item>
        <Form.Item label="密码">
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="请输入"
            onChange={event => setloginInfo({...loginInfo, password: event.target.value})}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}


export default memo(Login);
