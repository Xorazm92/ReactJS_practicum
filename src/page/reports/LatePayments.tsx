import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/request';

interface LatePayment {
  id: string;
  debtorName: string;
  debtAmount: number;
  dueDate: string;
}

const { Title } = Typography;

const LatePayments: React.FC = () => {
  const { data: latePayments, isLoading, error } = useQuery({
    queryKey: ['latePaymentsReport'],
    queryFn: () => api.get('/api/v1/store-statistics/late-payments').then((res) => res.data),
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
      title: 'Qarz Summasi',
      dataIndex: 'debtAmount',
      key: 'debtAmount',
      render: (debtAmount: number) => `${debtAmount} UZS`,
    },
    {
      title: 'Muddat Sanasi',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message="Kechikkan to'lovlarni yuklashda xatolik yuz berdi" type="error" style={{ margin: 24 }} />;

  return (
    <div className="late-payments-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        Kechikkan To'lovlar
      </Title>

      <Table
        columns={columns}
        dataSource={latePayments}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: 'Kechikkan to\'lovlar mavjud emas' }}
      />
    </div>
  );
};

export default LatePayments;