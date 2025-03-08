import React from 'react';
import { Button, Card, Form, InputNumber, Typography, message, Spin, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

interface Debt {
  id: string;
  debtorName: string;
  amount: number;
}

const AddPayment: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Nasiyalar ro‘yxatini olish
  const { data: debts, isLoading: debtsLoading } = useQuery({
    queryKey: ['debts'],
    queryFn: () => api.get('/api/v1/debt').then((res) => res.data),
  });

  const addPaymentMutation = useMutation({
    mutationFn: (data: any) => api.post('/api/v1/payments', data),
    onSuccess: () => {
      message.success(t('addPayment.success'));
      navigate('/');
    },
    onError: () => {
      message.error(t('addPayment.error'));
    },
  });

  const onFinish = (values: any) => {
    const paymentData = {
      debtId: values.debtId,
      amount: values.amount,
    };
    addPaymentMutation.mutate(paymentData);
  };

  return (
    <div className="add-payment-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('addPayment.title')}
      </Title>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: 24,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('addPayment.debtLabel')}</Text>}
            name="debtId"
            rules={[{ required: true, message: t('addPayment.debtRequired') }]}
            hasFeedback
          >
            <Select
              size="large"
              placeholder={t('addPayment.debtPlaceholder')}
              loading={debtsLoading}
              style={{ borderRadius: 8 }}
              aria-label={t('addPayment.debtLabel')}
            >
              {debts?.map((debt: Debt) => (
                <Option key={debt.id} value={debt.id}>
                  {debt.debtorName} - {debt.amount} UZS
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('addPayment.amountLabel')}</Text>}
            name="amount"
            rules={[{ required: true, message: t('addPayment.amountRequired') }]}
            hasFeedback
          >
            <InputNumber
              size="large"
              placeholder={t('addPayment.amountPlaceholder')}
              style={{ width: '100%', borderRadius: 8 }}
              min={0}
              formatter={(value) => `${value} UZS`}
              parser={(value) => {
                const parsedValue = value?.replace(/\s?UZS/g, '');
                return parsedValue && !isNaN(Number(parsedValue)) ? Number(parsedValue) as 0 : 0;
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={addPaymentMutation.status === 'pending'}
              style={{
                borderRadius: 8,
                backgroundColor: addPaymentMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                borderColor: addPaymentMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                height: 48,
                fontWeight: 500,
                boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                transition: 'all 0.2s ease',
              }}
              aria-label={t('addPayment.submit')}
            >
              {addPaymentMutation.status === 'pending' && (
                <Spin size="small" style={{ marginRight: 8 }} />
              )}
              {t('addPayment.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddPayment;