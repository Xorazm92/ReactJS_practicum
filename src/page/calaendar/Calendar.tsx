import { Card, Row, Col, Typography, Calendar as AntdCalendar, Alert, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Title, Text } = Typography;

const CustomCalendar = () => {
  const [tanlanganSana, setTanlanganSana] = useState(dayjs('2025-03-06')); // Tanlangan sana
  const [selectedValue, setSelectedValue] = useState(dayjs('2025-03-06')); // Joriy ko‘rsatilayotgan sana
  const navigate = useNavigate(); // Navigatsiya uchun

  // Namuna ma'lumotlar (real loyihada bu backenddan keladi)
  const kunlikTolov = '50 125 000 so‘m';
  const paymentsByDate: { [key: string]: { ism: string; miqdor: string; status: string; }[] } = {
    '2025-03-06': [
      { ism: 'Avazbek Jahongirov', miqdor: 'UZS 100 000', status: 'To‘lov qilgan' },
      { ism: 'Otabek Sulaymonov', miqdor: 'UZS 100 000', status: 'To‘lov qilgan' },
    ],
    '2025-03-07': [
      { ism: 'Shaxzod Mirzayev', miqdor: 'UZS 150 000', status: 'To‘lov qilgan' },
    ],
  };

  // Kun tanlanganda ishlaydigan funksiya
  const kunTanlash = (newValue: dayjs.Dayjs) => {
    setTanlanganSana(newValue);
    setSelectedValue(newValue);
    console.log('Tanlangan sana:', newValue.format('YYYY-MM-DD'));
  };

  // Panel o‘zgarganda (oy yoki yil o‘zgarishi)
  const panelOzgartirish = (newValue: dayjs.Dayjs) => {
    setTanlanganSana(newValue);
    console.log('Panel o‘zgardi:', newValue.format('YYYY-MM-DD'));
  };

  // Tanlangan sanadagi to‘lovlarni olish
  const getPaymentsForDate = (date: dayjs.Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return paymentsByDate[formattedDate] || [];
  };

  // Orqaga qaytish funksiyasi
  const handleBack = () => {
    navigate(-1); // Avvalgi sahifaga qaytish
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
      }}
    >
      {/* Tanlangan sana haqida xabar va orqaga qaytish tugmasi */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Alert
            message={`Siz tanlagan sana: ${selectedValue?.format('YYYY-MM-DD')}`}
            type="info"
            style={{
              borderRadius: 8,
              backgroundColor: '#e6f7ff',
              borderColor: '#91d5ff',
            }}
          />
        </Col>
        <Col>
          <Button
            onClick={handleBack}
            style={{
              borderRadius: 8,
              backgroundColor: '#e2e8f0',
              borderColor: '#e2e8f0',
              color: '#4a5568',
              height: 40,
              fontWeight: 500,
            }}
          >
            Orqaga
          </Button>
        </Col>
      </Row>

      {/* Sarlavha */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3} style={{ color: '#1a202c', margin: 0 }}>
            {tanlanganSana.format('MMMM, YYYY')}
          </Title>
        </Col>
        <Col>
          <Text style={{ color: '#4a5568', fontWeight: 500 }}>
            Oyilik jami: {kunlikTolov}
          </Text>
        </Col>
      </Row>

      {/* Antd Kalendar */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: 24,
          padding: '16px',
        }}
      >
        <AntdCalendar
          fullscreen={false}
          value={tanlanganSana}
          onSelect={kunTanlash}
          onPanelChange={panelOzgartirish}
          headerRender={({ value, onChange }) => (
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
              <Col>
                <Text strong style={{ fontSize: 16, color: '#1a202c' }}>
                  {value.format('MMMM, YYYY')}
                </Text>
              </Col>
              <Col>
                <Space>
                  <Button
                    onClick={() => onChange(value.subtract(1, 'month'))}
                    style={{
                      borderRadius: 8,
                      backgroundColor: '#e2e8f0',
                      borderColor: '#e2e8f0',
                      color: '#4a5568',
                    }}
                  >
                    {"<"}
                  </Button>
                  <Button
                    onClick={() => onChange(value.add(1, 'month'))}
                    style={{
                      borderRadius: 8,
                      backgroundColor: '#e2e8f0',
                      borderColor: '#e2e8f0',
                      color: '#4a5568',
                    }}
                  >
                    {">"}
                  </Button>
                </Space>
              </Col>
            </Row>
          )}
          dateCellRender={(value) => {
            const formattedDate = value.format('YYYY-MM-DD');
            const payments = paymentsByDate[formattedDate];
            return payments ? (
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: '#52c41a',
                  borderRadius: '50%',
                  margin: '0 auto',
                }}
              />
            ) : null;
          }}
        />
      </Card>

      {/* To‘lovlar ro‘yxati */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Text strong style={{ fontSize: 16, color: '#1a202c' }}>
              {tanlanganSana.format('D MMMM')}
            </Text>
          </Col>
          <Col>
            <Text style={{ color: '#52c41a', fontWeight: 500 }}>
              To‘lov qilgan
            </Text>
          </Col>
        </Row>

        {getPaymentsForDate(tanlanganSana).length > 0 ? (
          getPaymentsForDate(tanlanganSana).map((tolov, index) => (
            <Card
              key={index}
              style={{
                marginBottom: 8,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                padding: '8px 12px',
                transition: 'all 0.3s ease',
              }}
              hoverable
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Text style={{ color: '#1a202c' }}>{tolov.ism}</Text>
                </Col>
                <Col>
                  <Text style={{ color: '#4a5568', fontWeight: 500 }}>
                    {tolov.miqdor}
                  </Text>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <Text style={{ color: '#a0aec0' }}>
            Bu sanada to‘lov qilgan foydalanuvchilar yo‘q.
          </Text>
        )}
      </Card>
    </div>
  );
};

export default CustomCalendar;