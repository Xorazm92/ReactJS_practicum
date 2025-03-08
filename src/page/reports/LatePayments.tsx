import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface LatePayment {
  id: string;
  debtorName: string;
  debtAmount: number;
  dueDate: string;
}

const LatePayments: React.FC = () => {
  const { t } = useTranslation();

  const { data: latePayments, isLoading, error } = useQuery({
    queryKey: ['latePaymentsReport'],
    queryFn: () => api.get('/api/v1/store-statistics/late-payments').then((res) => res.data),
  });

  const columns = [
    {
      title: t('latePayments.id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('latePayments.debtor'),
      dataIndex: 'debtorName',
      key: 'debtorName',
    },
    {
      title: t('latePayments.debt'),
      dataIndex: 'debtAmount',
      key: 'debtAmount',
      render: (debtAmount: number) => `${debtAmount} UZS`,
    },
    {
      title: t('latePayments.dueDate'),
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message={t('latePayments.error')} type="error" style={{ margin: 24 }} />;

  return (
    <div className="late-payments-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('latePayments.title')}
      </Title>

      <Table
        columns={columns}
        dataSource={latePayments}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: t('latePayments.noData') }}
      />
    </div>
  );
};

export default LatePayments;