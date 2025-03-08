import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface Payment {
  id: string;
  debtId: string;
  debtorName: string;
  amount: number;
  date: string;
}

const PaymentHistory: React.FC = () => {
  const { t } = useTranslation();

  const { data: payments, isLoading, error } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: () => api.get('/api/v1/payments/PaymentHistory').then((res) => res.data),
  });

  const columns = [
    {
      title: t('paymentHistory.id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('paymentHistory.debtor'),
      dataIndex: 'debtorName',
      key: 'debtorName',
    },
    {
      title: t('paymentHistory.amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount} UZS`,
    },
    {
      title: t('paymentHistory.date'),
      dataIndex: 'date',
      key: 'date',
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message={t('paymentHistory.error')} type="error" style={{ margin: 24 }} />;

  return (
    <div className="payment-history-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('paymentHistory.title')}
      </Title>

      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: t('paymentHistory.noData') }}
      />
    </div>
  );
};

export default PaymentHistory;