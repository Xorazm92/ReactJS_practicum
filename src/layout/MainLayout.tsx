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
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { loadState } from '../config/storage';
import { api } from '../config/request';
import { debounce } from 'lodash'

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { token } = theme.useToken();

  const user = loadState('user');
  const navigate = useNavigate();
  const location = useLocation();

  // Barcha navigatsiya chaqiruvlarini debounce qilish
  const debouncedNavigate = React.useMemo(
    () => debounce((path: string, options?: { replace?: boolean; state?: any }) => {
      navigate(path, options);
    }, 300), // 300ms kutish
    [navigate]
  );

  // Navigatsiya mantiqini bitta useEffect ichiga jamlab qo'yish
  React.useEffect(() => {
    // Faqat user yo'q bo'lsa va hozirgi sahifa login sahifasi bo'lmasa navigatsiya qil
    if (!user && location.pathname !== '/login') {
      debouncedNavigate('/login', { 
        replace: true, 
        state: { from: location } 
      });
    }
  }, [user, debouncedNavigate, location]);

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout');
      localStorage.removeItem('user');
      
      // Debounce qilingan navigate
      debouncedNavigate('/login', { 
        replace: true,
        state: { from: location }
      });
    } catch (error) {
      message.error('Chiqishda xatolik yuz berdi!');
    }
  };

  // Menu elementlarini debounce qilingan navigatsiya bilan yangilash
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Bosh Sahifa',
      onClick: () => debouncedNavigate('/'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Mijoz Yaratish',
      onClick: () => debouncedNavigate('/create-customer'),
    },
    {
      key: '3',
      icon: <DollarOutlined />,
      label: 'Nasiya Berish',
      onClick: () => debouncedNavigate('/create-debt'),
    },
    {
      key: '4',
      icon: <DollarOutlined />,
      label: "To'lov Qabul Qilish",
      onClick: () => debouncedNavigate('/add-payment'),
    },
    {
      key: '5',
      icon: <DollarOutlined />,
      label: "To'lov Tarixi",
      onClick: () => debouncedNavigate('/payment-history'),
    },
    {
      key: '6',
      icon: <QrcodeOutlined />,
      label: 'QR Kod orqali To\'lov',
      onClick: () => debouncedNavigate('/qr-payment'),
    },
    {
      key: '7',
      icon: <DatabaseOutlined />,
      label: 'Hisobotlar',
      children: [
        {
          key: '7-1',
          label: 'Kalendar',
          onClick: () => debouncedNavigate('/calendar'),
        },
        {
          key: '7-2',
          label: "Kechiktirilgan To'lovlar",
          onClick: () => debouncedNavigate('/late-payments'),
        },
        {
          key: '7-3',
          label: 'Eng Faol Mijozlar',
          onClick: () => debouncedNavigate('/top-debtors'),
        },
        {
          key: '7-4',
          label: 'Excel Eksport/Import',
          onClick: () => debouncedNavigate('/export-import'),
        },
      ],
    },
    {
      key: '8',
      icon: <SettingOutlined />,
      label: 'Sozlamalar',
      children: [
        {
          key: '8-1',
          label: 'Kompaniya Sozlamalari',
          onClick: () => debouncedNavigate('/company-settings'),
        },
        ...(user?.role === 'admin'
          ? [
              {
                key: '8-2',
                label: 'Foydalanuvchilar',
                onClick: () => debouncedNavigate('/user-management'),
              },
            ]
          : []),
        {
          key: '8-3',
          label: 'Bildirishnoma Sozlamalari',
          onClick: () => debouncedNavigate('/notification-settings'),
        },
      ],
    },
  ];

  // Dropdown menyu elementlarini yangilash
  const profileMenu = {
    items: [
      {
        key: '1', 
        icon: <UserOutlined />, 
        label: 'Profil',
        onClick: () => debouncedNavigate('/profile')
      },
      {
        key: '2', 
        icon: <LogoutOutlined />, 
        label: 'Chiqish',
        onClick: handleLogout
      }
    ]
  };

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
              Nasiya
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
            <Dropdown 
              menu={profileMenu} 
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <Text>{user?.name || 'Foydalanuvchi'}</Text>
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