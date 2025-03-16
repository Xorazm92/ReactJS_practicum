import { QRCodeCanvas } from 'qrcode.react';
import { Button, Card, Input, Typography, message } from 'antd';
import React from 'react';

const { Title } = Typography;

const QRPayment = () => {
  const [qrValue, setQrValue] = React.useState('');

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3}>QR To'lov</Title>
      <Card>
        <Input 
          placeholder="Summani kiriting"
          onChange={(e: { target: { value: any; }; }) => setQrValue(e.target.value)}
          style={{ marginBottom: 20 }}
        />
        {qrValue && (
          <QRCodeCanvas 
            value={qrValue}
            size={256}
            level="H"
          />
        )}
        <Button 
          type="primary" 
          style={{ marginTop: 20 }}
          onClick={() => message.success('QR kod muvaffaqiyatli yaratildi')}
        >
          QR Kod Yaratish
        </Button>
      </Card>
    </div>
  );
};

export default QRPayment;