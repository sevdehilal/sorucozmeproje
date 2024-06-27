import React, { useState } from 'react';
import { Button, Input, Form, message, Row, Col, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;
const { Header, Content } = Layout;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
///kullanıcı giriş bilgilerini kontrol eder.
  const handleLogin = async () => {
    try {
      const response = await axios.get('https://v1.nocodeapi.com/pnurdemirtas/google_sheets/qSDpvYTFWqMjCvoZ?tabId=Sheet1');
      const data = response.data;

      const user = data.data.find(user => user.username === username && user.password === password);

      if (user) {
        message.success('Login successful');
        onLogin(); // Giriş durumu güncellenir
        navigate('/profile', { state: { username } });
      } else {
        message.error('Invalid credentials');
      }
    } catch (error) {
      message.error('Error accessing data');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', width: '100%', zIndex: 1, backgroundColor: '#001529' }}>
        <Title level={3} style={{ color: 'white', margin: '1px' }}>
          QUİZ APP
        </Title>
      </Header>
      
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '0', marginTop: '0' }}>
        <Row justify="center" align="middle" style={{ width: '100%' }}>
          <Col xs={22} sm={16} md={10} lg={6} style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Login</Title>
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="large"
                  placeholder="Enter your username"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="large"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item>
              <Row justify="center">
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                    >
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;

