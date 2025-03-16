import React from 'react';
import { Table, Typography, Spin, Alert, Button, Space, message } from 'antd';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../config/request';
import { AxiosError } from 'axios';

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator';
}

const UserManagement: React.FC = () => {

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/api/v1/admin/users').then((res) => res.data),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => api.delete(`/api/v1/admin/users/${userId}`),
    onSuccess: () => {
      message.success('User deleted successfully');
      refetch();
    },
    onError: () => {
      message.error('User deletion failed');
    },
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => message.info('Edit not implemented')}
            aria-label="Edit User"
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteUserMutation.mutate(record.id)}
            disabled={deleteUserMutation.status === 'pending'}
            aria-label="Delete User"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Alert message="User management error" type="error" style={{ margin: 24 }} />;

  return (
    <div className="user-management-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        User Management
      </Title>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ borderRadius: 8, overflow: 'hidden' }}
        locale={{ emptyText: 'No data' }}
      />
    </div>
  );
};

export default UserManagement;