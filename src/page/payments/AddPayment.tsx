import React from 'react';
import { Button, Card, Form, InputNumber, Typography, message, Spin, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../config/request';

const { Title, Text } = Typography;
const { Option } = Select;

interface Debt {
  id: string;
  debtorName: string;
  amount: number;
}

const AddPayment: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Nasiyalar ro'yxatini olish
  const { data: debts, isLoading: debtsLoading } = useQuery({
    queryKey: ['debts'],
    queryFn: () => api.get('/api/v1/debt').then((res) => res.data),
  });

  const addPaymentMutation = useMutation({
    mutationFn: (data: any) => api.post('/api/v1/payments', data),
    onSuccess: () => {
      message.success('To\'lov muvaffaqiyatli qo\'shildi');
      navigate('/');
    },
    onError: () => {
      message.error('To\'lovni qo\'shishda xatolik yuz berdi');
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
        To'lov Qo'shish
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
            label={<Text strong style={{ color: '#4a5568' }}>Nasiya</Text>}
            name="debtId"
            rules={[{ required: true, message: 'Nasiyani tanlang' }]}
            hasFeedback
          >
            <Select
              size="large"
              placeholder="Nasiyani tanlang"
              loading={debtsLoading}
              style={{ borderRadius: 8 }}
              aria-label="Nasiya"
            >
              {debts?.map((debt: Debt) => (
                <Option key={debt.id} value={debt.id}>
                  {debt.debtorName} - {debt.amount} UZS
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>To'lov Summasi</Text>}
            name="amount"
            rules={[{ required: true, message: 'To\'lov summasini kiriting' }]}
            hasFeedback
          >
            <InputNumber
              size="large"
              placeholder="To'lov summasini kiriting"
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
              aria-label="To'lov Qo'shish"
            >
              {addPaymentMutation.status === 'pending' && (
                <Spin size="small" style={{ marginRight: 8 }} />
              )}
              To'lov Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddPayment;
