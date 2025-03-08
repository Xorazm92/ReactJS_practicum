import { QRCodeCanvas } from 'qrcode.react'; // To'g'ri import usuli
import { Button, Card, Input, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';


const { Title } = Typography;

const QRPayment = () => {
  const { t } = useTranslation();
  const [qrValue, setQrValue] = React.useState('');

  return (
    <div style={{ padding: '20px' }}>
      <Title level={3}>{t('qr_payment')}</Title>
      <Card>
        <Input 
          placeholder={t('enter_amount')}
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
          onClick={() => message.success(t('qr_generated'))}
        >
          {t('generate_qr')}
        </Button>
      </Card>
    </div>
  );
};

export default QRPayment;