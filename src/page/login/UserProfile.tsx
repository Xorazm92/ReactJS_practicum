import * as React from 'react';
import { Typography, Card, Avatar, Descriptions, Button } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserProfile: React.FC = () => {
  
  // Foydalanuvchi ma'lumotlari (amalda bu ma'lumotlar API dan olinadi)
  const userInfo = {
    name: 'Foydalanuvchi Ismi',
    email: 'foydalanuvchi@example.com',
    phone: '+998 90 123 45 67',
    role: 'Admin',
    lastLogin: '2025-03-08 08:00',
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>{t('user_profile')}</Title>
      
      <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar size={80} icon={<UserOutlined />} />
          <div style={{ marginLeft: '20px' }}>
            <Title level={3}>{userInfo.name}</Title>
            <p>{userInfo.email}</p>
          </div>
        </div>
        
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t('email')}>{userInfo.email}</Descriptions.Item>
          <Descriptions.Item label={t('phone')}>{userInfo.phone}</Descriptions.Item>
          <Descriptions.Item label={t('role')}>{userInfo.role}</Descriptions.Item>
          <Descriptions.Item label={t('last_login')}>{userInfo.lastLogin}</Descriptions.Item>
        </Descriptions>
        
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button type="primary" icon={<EditOutlined />}>{t('edit_profile')}</Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
