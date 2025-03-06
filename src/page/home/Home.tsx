import { Card, Row, Col, Typography, Statistic, Button } from 'antd';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // `react-router-dom` dan `Link` ni `RouterLink` deb nomladik
import { EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Title, Text, Link } = Typography; // Antd dan `Link` ni `Typography` dan olamiz


export const Home = () => {
  const [korish, setKorish] = useState<boolean>(false);

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
          Umumiy nasiya: {korish ? '* * * * * *' : '135 214 200 so‘m'}{' '}
          <Col style={{ display: 'inline-block' }} onClick={() => setKorish(!korish)}>
            {!korish ? <EyeOutlined /> : <EyeInvisibleOutlined />}
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
        extra={
          <Link href="/payment-options">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </Link>
        }
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

      {/* Kalendar ekrani uchun tugma */}
      <Link href="/calendar">
        <Button type="primary" block style={{ marginTop: 16 }}>
          Kalendar
        </Button>
      </Link>

      {/* Pastki linklar */}
      <Row justify="space-between" style={{ marginTop: 16 }}>
        <Col>
          <Text>Bu oy uchun to‘lov:</Text>
        </Col>
        <Col>
          <Text style={{ color: '#52c41a' }}>To‘lov qilgan</Text>
        </Col>
      </Row>

      <Link href="/login">
        <Title level={1} style={{ display: 'block', marginTop: 20, textAlign: 'center' }}>
          Click me
        </Title>
      </Link>
    </div>
  );
};

