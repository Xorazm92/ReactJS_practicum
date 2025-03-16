import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/request';

const { Title } = Typography;

interface TopDebtor {
  id: string;
  name: string;
  totalDebt: number;
  paymentCount: number;
}

const TopDebtors: React.FC = () => {

  const { data: topDebtors, isLoading, error } = useQuery({
    queryKey: ['topDebtors'],
    queryFn: () => api.get('/api/v1/debtors/top').then((res) => res.data), // Bu endpoint backend’da bo‘lishi kerak
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Foydalanuvchi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Jami To\'lov',
      dataIndex: 'totalDebt',
      key: 'totalDebt',
      render: (totalDebt: number) => `${totalDebt} UZS`,
    },
    {
      title: 'To\'lovlar soni',
      dataIndex: 'paymentCount',
      key: 'paymentCount',
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message="Top Debtors loading failed" type="error" style={{ margin: 24 }} />;

  return (
    <div className="top-debtors-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        Top Debtors
      </Title>

      <Table
        columns={columns}
        dataSource={topDebtors}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: 'No data available' }}
      />
    </div>
  );
};

export default TopDebtors;
