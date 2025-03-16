import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/request';

interface Payment {
  id: string;
  debtId: string;
  debtorName: string;
  amount: number;
  date: string;
}

const PaymentHistory: React.FC = () => {
  const { data: payments, isLoading, error } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: () => api.get('/api/v1/payments/PaymentHistory').then((res) => res.data),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Qarzdor',
      dataIndex: 'debtorName',
      key: 'debtorName',
    },
    {
      title: 'Summa',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount} UZS`,
    },
    {
      title: 'Sana',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message="To'lovlar tarixini yuklashda xatolik yuz berdi" type="error" style={{ margin: 24 }} />;

  return (
    <div className="payment-history-container" style={{ padding: 24 }}>
      <Typography.Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        To'lovlar Tarixi
      </Typography.Title>

      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: 'To\'lovlar mavjud emas' }}
      />
    </div>
  );
};

export default PaymentHistory;