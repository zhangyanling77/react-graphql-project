import React, {memo} from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';

interface LoginProps {
  closeForm: any
}

interface LoginState {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({closeForm}) => {
  let [loginInfo, setloginInfo] = useState<LoginState>({username: '', password: ''})

  const handleSubmit = async() => {
    console.log(loginInfo)
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
          <Button type="primary">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}


export default memo(Login);
