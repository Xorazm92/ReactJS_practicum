import React from 'react';
import { Button, Card, Form, Input, InputNumber, Typography, message, Spin, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

interface Debtor {
  id: string;
  name: string;
}

const CreateDebt: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Mijozlar ro‘yxatini olish
  const { data: debtors, isLoading: debtorsLoading } = useQuery({
    queryKey: ['debtors'],
    queryFn: () => api.get('/api/v1/debtors').then((res) => res.data),
  });

  const createDebtMutation = useMutation({
    mutationFn: (data: any) => api.post('/api/v1/debt', data),
    onSuccess: () => {
      message.success(t('createDebt.success'));
      navigate('/');
    },
    onError: () => {
      message.error(t('createDebt.error'));
    },
  });

  const onFinish = (values: any) => {
    const debtData = {
      debtorId: values.debtorId,
      amount: values.amount,
      description: values.description,
      dueDate: values.dueDate,
    };
    createDebtMutation.mutate(debtData);
  };

  return (
    <div className="create-debt-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('createDebt.title')}
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
            label={<Text strong style={{ color: '#4a5568' }}>{t('createDebt.debtorLabel')}</Text>}
            name="debtorId"
            rules={[{ required: true, message: t('createDebt.debtorRequired') }]}
            hasFeedback
          >
            <Select
              size="large"
              placeholder={t('createDebt.debtorPlaceholder')}
              loading={debtorsLoading}
              style={{ borderRadius: 8 }}
              aria-label={t('createDebt.debtorLabel')}
            >
              {debtors?.map((debtor: Debtor) => (
                <Option key={debtor.id} value={debtor.id}>
                  {debtor.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createDebt.amountLabel')}</Text>}
            name="amount"
            rules={[{ required: true, message: t('createDebt.amountRequired') }]}
            hasFeedback
          >
            <InputNumber
              size="large"
              placeholder={t('createDebt.amountPlaceholder')}
              style={{ width: '100%', borderRadius: 8 }}
              min={0}
              formatter={(value) => `${value} UZS`}
              parser ={() => 0}
              aria-label={t('createDebt.amountLabel')}
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createDebt.descriptionLabel')}</Text>}
            name="description"
            rules={[{ required: true, message: t('createDebt.descriptionRequired') }]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder={t('createDebt.descriptionPlaceholder')}
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label={t('createDebt.descriptionLabel')}
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createDebt.dueDateLabel')}</Text>}
            name="dueDate"
            rules={[{ required: true, message: t('createDebt.dueDateRequired') }]}
            hasFeedback
          >
            <Input
              type="date"
              size="large"
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label={t('createDebt.dueDateLabel')}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={createDebtMutation.status === 'pending'}
              style={{
                borderRadius: 8,
                backgroundColor: createDebtMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                borderColor: createDebtMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                height: 48,
                fontWeight: 500,
                boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                transition: 'all 0.2s ease',
              }}
              aria-label={t('createDebt.submit')}
            >
              {createDebtMutation.status === 'pending' && <Spin size="small" style={{ marginRight: 8 }} />}
              {t('createDebt.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDebt;