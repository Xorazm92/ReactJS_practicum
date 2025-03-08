import React from 'react';
import { Table, Typography, Spin, Alert, Button, Space, message } from 'antd';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator';
}

const UserManagement: React.FC = () => {
  const { t } = useTranslation();

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/api/v1/admin/users').then((res) => res.data),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => api.delete(`/api/v1/admin/users/${userId}`),
    onSuccess: () => {
      message.success(t('userManagement.deleteSuccess'));
      refetch();
    },
    onError: () => {
      message.error(t('userManagement.deleteError'));
    },
  });

  const columns = [
    {
      title: t('userManagement.id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('userManagement.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('userManagement.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('userManagement.role'),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: t('userManagement.actions'),
      key: 'actions',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => message.info(t('userManagement.editNotImplemented'))}
            aria-label={t('userManagement.edit')}
          >
            {t('userManagement.edit')}
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteUserMutation.mutate(record.id)}
            disabled={deleteUserMutation.status === 'pending'}
            aria-label={t('userManagement.delete')}
          >
            {t('userManagement.delete')}
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message={t('userManagement.error')} type="error" style={{ margin: 24 }} />;

  return (
    <div className="user-management-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('userManagement.title')}
      </Title>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: t('userManagement.noData') }}
      />
    </div>
  );
};

export default UserManagement;