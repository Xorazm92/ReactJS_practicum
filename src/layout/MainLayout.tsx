import React, { useEffect, useState } from 'react';
import {
  DatabaseOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Typography, Row, Col, Space, Dropdown, Badge } from 'antd';
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

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem('user'); // User ma'lumotlarini o'chirish
    navigate('/login');
  };

  // Profil menyusi
  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        Profil
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Chiqish
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          backgroundColor: '#1a202c', // Darker sidebar for contrast
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
          position: 'fixed',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              maxWidth: collapsed ? '60px' : '120px',
              height: 'auto',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ backgroundColor: '#1a202c', padding: '8px 0' }}
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
              label: 'Nasiya Yaratish',
              onClick: () => navigate('/payment-options'),
            },
            {
              key: '4',
              icon: <DatabaseOutlined />,
              label: 'Xisobotlar',
              onClick: () => navigate('/reports'),
            },
          ]}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.3s ease' }}>
        {/* Header */}
        <Header
          style={{
            padding: '0 24px',
            background: '#ffffff', // White header for contrast
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
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
              fontSize: '18px',
              width: 48,
              height: 48,
              color: '#4a5568',
            }}
            aria-label={collapsed ? 'Menuni ochish' : 'Menuni yopish'}
          />

          {/* O‘ng taraf: Bildirishnomalar va Profil */}
          <Row align="middle">
            <Col>
              <Badge count={5} style={{ marginRight: 24 }}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ fontSize: '18px', color: '#4a5568' }}
                  onClick={() => navigate('/notifications')}
                  aria-label="Bildirishnomalar"
                />
              </Badge>
            </Col>
            <Col>
              <Dropdown overlay={profileMenu} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar
                    size={40}
                    src={
                      user?.avatar ||
                      'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png'
                    }
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: '#1a202c', fontSize: 16, fontWeight: 500 }}>
                    {user?.name || 'Zufarbek'}
                  </Text>
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: '24px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;