import { Card, Row, Col, Typography, Calendar as AntdCalendar, Alert, Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Title, Text } = Typography;

const CustomCalendar = () => {
  const [tanlanganSana, setTanlanganSana] = useState(dayjs('2025-03-06')); // Joriy ko‘rsatilayotgan sana
  const [selectedValue, setSelectedValue] = useState(dayjs('2025-03-06')); // Tanlangan sana

  // Namuna ma'lumotlar
  const kunlikTolov = '50 125 000 so‘m';
  const tolovlarRoyxati = [
    { ism: 'Avazbek Jahongirov', miqdor: 'UZS 100 000' },
    { ism: 'Otabek Sulaymonov', miqdor: 'UZS 100 000' },
  ];

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

  return (
    <div style={{ padding: 16 }}>
      {/* Tanlangan sana haqida xabar */}
      <Alert
        message={`Siz tanlagan sana: ${selectedValue?.format('YYYY-MM-DD')}`}
        type="info"
        style={{ marginBottom: 16 }}
      />

      {/* Sarlavha */}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>mart, 2025</Title>
        </Col>
        <Col>
          <Text>Oyilik jami: {kunlikTolov}</Text>
        </Col>
      </Row>

      {/* Antd Kalendar */}
      <AntdCalendar
        fullscreen={false}
        value={tanlanganSana}
        onSelect={kunTanlash}
        onPanelChange={panelOzgartirish}
        headerRender={({ value, onChange }) => (
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col>
              <Text>{value.format('MMMM, YYYY')}</Text>
            </Col>
            <Col>
              <Button onClick={() => onChange(value.subtract(1, 'month'))}>{"<"}</Button>
              <Button onClick={() => onChange(value.add(1, 'month'))} style={{ marginLeft: 8 }}>
                {">"}
              </Button>
            </Col>
          </Row>
        )}
      />

      {/* To‘lovlar ro‘yxati */}
      <Card style={{ marginTop: 16 }}>
        <Text>{tanlanganSana.format('D MMMM')}</Text>
        <Text style={{ float: 'right', color: '#52c41a' }}>To‘lov qilgan</Text>
        {tolovlarRoyxati.map((tolov, index) => (
          <Card key={index} style={{ marginTop: 8 }}>
            <Row justify="space-between">
              <Col>
                <Text>{tolov.ism}</Text>
              </Col>
              <Col>
                <Text>{tolov.miqdor}</Text>
              </Col>
            </Row>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default CustomCalendar;