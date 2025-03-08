import * as React from 'react';
import {
  DatabaseOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SettingOutlined,
  QrcodeOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Typography, Space, Dropdown, Badge, message } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { loadState } from '../config/storage';
import { api } from '../config/request';
import { useTranslation } from 'react-i18next';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = React.useState(false);
  const { token } = theme.useToken();

  const user = loadState('user');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      message.error(t('layout.logoutError'));
    }
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        {t('layout.profile')}
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        {t('layout.logout')}
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: t('layout.home'),
      onClick: () => navigate('/'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: t('layout.createCustomer'),
      onClick: () => navigate('/create-customer'),
    },
    {
      key: '3',
      icon: <DollarOutlined />,
      label: t('layout.createDebt'),
      onClick: () => navigate('/create-debt'),
    },
    {
      key: '4',
      icon: <DollarOutlined />,
      label: t('layout.addPayment'),
      onClick: () => navigate('/add-payment'),
    },
    {
      key: '5',
      icon: <DollarOutlined />,
      label: t('layout.paymentHistory'),
      onClick: () => navigate('/payment-history'),
    },
    {
      key: '6',
      icon: <QrcodeOutlined />,
      label: t('layout.qrPayment'),
      onClick: () => navigate('/qr-payment'),
    },
    {
      key: '7',
      icon: <DatabaseOutlined />,
      label: t('layout.reports'),
      children: [
        {
          key: '7-1',
          label: t('layout.calendar'),
          onClick: () => navigate('/calendar'),
        },
        {
          key: '7-2',
          label: t('layout.latePayments'),
          onClick: () => navigate('/late-payments'),
        },
        {
          key: '7-3',
          label: t('layout.topDebtors'),
          onClick: () => navigate('/top-debtors'),
        },
        {
          key: '7-4',
          label: t('layout.exportImport'),
          onClick: () => navigate('/export-import'),
        },
      ],
    },
    {
      key: '8',
      icon: <SettingOutlined />,
      label: t('layout.settings'),
      children: [
        {
          key: '8-1',
          label: t('layout.companySettings'),
          onClick: () => navigate('/company-settings'),
        },
        ...(user?.role === 'admin'
          ? [
              {
                key: '8-2',
                label: t('layout.userManagement'),
                onClick: () => navigate('/user-management'),
              },
            ]
          : []),
        {
          key: '8-3',
          label: t('layout.notificationSettings'),
          onClick: () => navigate('/notification-settings'),
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          backgroundColor: '#1a202c',
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
          <ShopOutlined style={{ 
            fontSize: collapsed ? '32px' : '48px', 
            color: '#fff',
            transition: 'all 0.3s ease' 
          }} />
          {!collapsed && (
            <Typography.Title level={4} style={{ color: '#fff', margin: '16px 0 0' }}>
              {t('app_name')}
            </Typography.Title>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ backgroundColor: '#1a202c', padding: '8px 0' }}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.3s ease' }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Space>
            <Badge count={5} dot>
              <BellOutlined style={{ fontSize: '20px' }} />
            </Badge>
            <Dropdown overlay={profileMenu} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <Text>{user?.name || t('layout.user')}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
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