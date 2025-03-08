import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface TopDebtor {
  id: string;
  name: string;
  totalDebt: number;
  paymentCount: number;
}

const TopDebtors: React.FC = () => {
  const { t } = useTranslation();

  const { data: topDebtors, isLoading, error } = useQuery({
    queryKey: ['topDebtors'],
    queryFn: () => api.get('/api/v1/debtors/top').then((res) => res.data), // Bu endpoint backend’da bo‘lishi kerak
  });

  const columns = [
    {
      title: t('topDebtors.id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('topDebtors.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('topDebtors.totalDebt'),
      dataIndex: 'totalDebt',
      key: 'totalDebt',
      render: (totalDebt: number) => `${totalDebt} UZS`,
    },
    {
      title: t('topDebtors.paymentCount'),
      dataIndex: 'paymentCount',
      key: 'paymentCount',
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message={t('topDebtors.error')} type="error" style={{ margin: 24 }} />;

  return (
    <div className="top-debtors-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('topDebtors.title')}
      </Title>

      <Table
        columns={columns}
        dataSource={topDebtors}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: t('topDebtors.noData') }}
      />
    </div>
  );
};

export default TopDebtors;
