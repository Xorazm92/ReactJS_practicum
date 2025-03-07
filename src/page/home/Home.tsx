import { Card, Row, Col, Typography, Statistic, Button, Space } from 'antd';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CalendarOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Title, Text, Link } = Typography;

export const Home = () => {
  const [korish, setKorish] = useState<boolean>(false);

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Umumiy nasiya karta */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)', // Gradient for modern look
          color: '#fff',
          borderRadius: 16,
          marginBottom: 24,
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          transition: 'transform 0.3s ease', // Smooth hover effect
        }}
        hoverable
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>
              Umumiy nasiya: {korish ? '* * * * * *' : '135 214 200 so‘m'}
            </Title>
          </Col>
          <Col>
            <Button
              type="text"
              icon={korish ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => setKorish(!korish)}
              style={{ color: '#fff', fontSize: 20 }}
            />
          </Col>
        </Row>
      </Card>

      {/* Kechiktirilgan to‘lovlar va mijozlar soni */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card
            style={{
              textAlign: 'center',
              borderRadius: 12,
              border: '1px solid #ff4d4f',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
            }}
            hoverable
          >
            <Text style={{ color: '#ff4d4f', fontWeight: 500 }}>
              Kechiktirilgan to‘lovlar: 26
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            style={{
              textAlign: 'center',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
            }}
            hoverable
          >
            <Text style={{ fontWeight: 500 }}>Mijozlar soni: 151</Text>
          </Card>
        </Col>
      </Row>

      {/* Hamyon bo‘limi */}
      <Card
        title={<Title level={4} style={{ margin: 0 }}>Hamyoningiz</Title>}
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: 'none',
        }}
        extra={
          <RouterLink to="/payment-options">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                boxShadow: '0 2px 6px rgba(24, 144, 255, 0.3)',
              }}
            />
          </RouterLink>
        }
      >
        <Row justify="center" align="middle">
          <Col>
            <Statistic
              title={<Text style={{ color: '#666' }}>Hisobingizda</Text>}
              value={300000}
              suffix="so‘m"
              valueStyle={{ color: '#1890ff', fontSize: 32, fontWeight: 600 }}
            />
          </Col>
        </Row>
      </Card>

      {/* Kalendar icon */}
      <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: 24 }}>
        <RouterLink to="/calendar" style={{ display: 'block', textAlign: 'center' }}>
          <Button
            type="primary"
            shape="circle"
            icon={<CalendarOutlined />}
            size="large"
            style={{
              width: 64,
              height: 64,
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)',
              fontSize: 24,
            }}
          />
        </RouterLink>
      </Space>

      {/* Pastki linklar */}
      <Row justify="space-between" style={{ marginBottom: 24 }}>
        <Col>
          <Text style={{ color: '#666' }}>Bu oy uchun to‘lov:</Text>
        </Col>
        <Col>
          <Text style={{ color: '#27ae60', fontWeight: 500 }}>To‘lov qilgan</Text>
        </Col>
      </Row>

      {/* Click me link */}
      <RouterLink to="/login">
        <Title
          level={2}
          style={{
            textAlign: 'center',
            color: '#1890ff',
            margin: 0,
            transition: 'color 0.3s ease',
          }}
          className="click-me-link"
        >
          Click me
        </Title>
      </RouterLink>

      {/* Inline CSS for hover effect on Click me */}
      <style>{`
        .click-me-link:hover {
          color: #40a9ff !important;
        }
      `}</style>
    </div>
  );
};