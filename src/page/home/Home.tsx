import { Card, Row, Col, Typography, Statistic, Button } from 'antd';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // `react-router-dom` dan `Link` ni `RouterLink` deb nomladik
import { EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const { Title, Text, Link } = Typography; // Antd dan `Link` ni `Typography` dan olamiz


export const Home = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState<boolean>(false)

  return (
    <div style={{ padding: 16 }}>
      {/* Umumiy nasiya karta */}
      <Card
        style={{
          backgroundColor: '#52c41a',
          color: '#fff',
          borderRadius: 8,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
<Title level={4} style={{ color: '#fff' }}>
          Umumiy nasiya: {state ? "* * * * * *" : "135 214 200 so‘m"}{' '}
          <Col style={{display:"inline-block"}} onClick={() => setState(!state)}>
             {!state ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </Col>
        </Title>
      </Card>

      {/* Kechiktirilgan to‘lovlar va mijozlar soni */}
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ textAlign: 'center', borderColor: '#ff4d4f' }}>
            <Text style={{ color: '#ff4d4f' }}>Kechiktirilgan to‘lovlar: 26</Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ textAlign: 'center' }}>
            <Text>Mijozlar soni: 151</Text>
          </Card>
        </Col>
      </Row>

      {/* Hamyon bo‘limi */}
      <Card
        title="Hamyoningiz"
        style={{ marginTop: 16 }}
        extra={<Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => navigate('/login')} />}
      >
        <Row justify="center" align="middle">
          <Col>
            <Statistic
              title="Hisobingizda"
              value={300000}
              suffix="so‘m"
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Pastki tugmalar (linklar) */}
      <Row justify="space-between" style={{ marginTop: 16 }}>
        <Col>
          <Link>Bu oy uchun to‘lov:</Link>
        </Col>
        <Col>
          <Link style={{ color: '#52c41a' }}>To‘lov qilgan</Link>
        </Col>
      </Row>

      {/* "Click me" linkingiz, `react-router-dom` dan `RouterLink` bilan */}
      <RouterLink to="/login" style={{ display: 'block', marginTop: 20, textAlign: 'center' }}>
        <Title level={1}>Click me</Title>
      </RouterLink>
    </div>
  );
};

export default Home;