import React from 'react';
import { Button, Card, Form, Input, Upload, Typography, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  details: string;
}

const CompanySettings: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ['companySettings'],
    queryFn: () => api.get('/api/v1/admin/company').then((res) => res.data),
  });

  const updateCompanyMutation = useMutation({
    mutationFn: (data: FormData) => api.patch('/api/v1/admin/company', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    onSuccess: () => {
      message.success(t('companySettings.success'));
    },
    onError: () => {
      message.error(t('companySettings.error'));
    },
  });

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('details', values.details);
    if (values.logo?.[0]?.originFileObj) {
      formData.append('logo', values.logo[0].originFileObj);
    }
    updateCompanyMutation.mutate(formData);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} ${t('companySettings.fileUploaded')}`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${t('companySettings.fileError')}`);
    }
  };

  return (
    <div className="company-settings-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('companySettings.title')}
      </Title>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: 24,
        }}
      >
        {companyLoading ? (
          <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={{
              name: company?.name,
              details: company?.details,
            }}
          >
            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>{t('companySettings.nameLabel')}</Text>}
              name="name"
              rules={[{ required: true, message: t('companySettings.nameRequired') }]}
              hasFeedback
            >
              <Input
                size="large"
                placeholder={t('companySettings.namePlaceholder')}
                style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
                aria-label={t('companySettings.nameLabel')}
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>{t('companySettings.detailsLabel')}</Text>}
              name="details"
              rules={[{ required: true, message: t('companySettings.detailsRequired') }]}
              hasFeedback
            >
              <Input.TextArea
                rows={4}
                placeholder={t('companySettings.detailsPlaceholder')}
                style={{ borderRadius: 8, borderColor: '#d9e2ec' }}
                aria-label={t('companySettings.detailsLabel')}
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>{t('companySettings.logoLabel')}</Text>}
              name="logo"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                maxCount={1}
                accept="image/*"
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
              >
                <Button
                  icon={<UploadOutlined />}
                  size="large"
                  style={{
                    borderRadius: 8,
                    backgroundColor: '#e2e8f0',
                    borderColor: '#e2e8f0',
                    color: '#4a5568',
                    width: '100%',
                  }}
                >
                  {t('companySettings.uploadButton')}
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={updateCompanyMutation.isLoading}
                style={{
                  borderRadius: 8,
                  backgroundColor: updateCompanyMutation.isLoading ? '#a0aec0' : '#3182ce',
                  borderColor: updateCompanyMutation.isLoading ? '#a0aec0' : '#3182ce',
                  height: 48,
                  fontWeight: 500,
                  boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                aria-label={t('companySettings.submit')}
              >
                {updateCompanyMutation.isLoading && <Spin size="small" style={{ marginRight: 8 }} />}
                {t('companySettings.submit')}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default CompanySettings;