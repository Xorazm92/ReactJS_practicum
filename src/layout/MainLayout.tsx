import React, { useEffect, useState } from 'react';
import {
  DatabaseOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Typography, Row, Col } from 'antd'; // Avatar va Typography qo‘shildi
import { Outlet, useNavigate } from 'react-router-dom';
import { loadState } from '../config/storage'; // Fayl mavjudligiga ishonch hosil qiling
import Logo from '../assets/image.png';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = loadState('user'); // User ma'lumotlarini olish
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
        <div className="demo-logo-vertical" style={{ padding: '16px', textAlign: 'center' }}>
          <img src={Logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Bosh Sahifa',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Mijoz Yaratish',
              onClick: () => navigate('/create-customer'),
            },
            {
              key: '3',
              icon: <DollarOutlined />,
              label: 'Nasiya yaratish',
              onClick: () => navigate('/payment-options'), // Masalan, nasiya sahifasi
            },
            {
              key: '4',
              icon: <DatabaseOutlined />,
              label: 'Xisobotlar',
              onClick: () => navigate('/reports'), // Xisobotlar uchun yangi marshrut
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: '#001529',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Chap taraf: Sidebar tugmasi */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#fff',
            }}
          />

          {/* O‘ng taraf: Profil rasmi va ism */}
          <Row align="middle">
            <Col>
              <Avatar
                size={40}
                src={user?.avatar || 'https://via.placeholder.com/40'} // User dan avatar olish
                style={{ marginRight: 8 }}
              />
            </Col>
            <Col>
              <Text style={{ color: '#fff', fontSize: 16 }}>
                {user?.name || 'Foydalanuvchi'} {/* User dan ism olish */}
              </Text>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;