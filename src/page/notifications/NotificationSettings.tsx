import React from 'react';
import { Button, Card, Form, Switch, Typography, message, Spin } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { AxiosError } from 'axios';

const { Title, Text } = Typography;

interface NotificationSettingsData {
  smsEnabled: boolean;
  emailEnabled: boolean;
}

const NotificationSettings: React.FC = () => {
  const [form] = Form.useForm();

  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['notificationSettings'],
    queryFn: () => api.get('/api/v1/admin/notifications').then((res) => res.data),
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data: NotificationSettingsData) => api.patch('/api/v1/admin/notifications', data),
    onSuccess: () => {
      message.success('Notification settings updated successfully');
    },
    onError: () => {
      message.error('Notification settings update failed');
    },
  });

  const onFinish = (values: NotificationSettingsData) => {
    updateSettingsMutation.mutate(values);
  };

  return (
    <div className="notification-settings-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        Notification Settings
      </Title>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: 24,
        }}
      >
        {settingsLoading ? (
          <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={{
              smsEnabled: settings?.smsEnabled || false,
              emailEnabled: settings?.emailEnabled || false,
            }}
          >
            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>SMS Notifications</Text>}
              name="smsEnabled"
              valuePropName="checked"
            >
              <Switch aria-label="SMS Notifications" />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>Email Notifications</Text>}
              name="emailEnabled"
              valuePropName="checked"
            >
              <Switch aria-label="Email Notifications" />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={updateSettingsMutation.status === 'pending'}
                style={{
                  borderRadius: 8,
                  backgroundColor: updateSettingsMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                  borderColor: updateSettingsMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                  height: 48,
                  fontWeight: 500,
                  boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Notification Settings Submit"
              >
                {updateSettingsMutation.status === 'pending' && <Spin size="small" style={{ marginRight: 8 }} />}
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default NotificationSettings;