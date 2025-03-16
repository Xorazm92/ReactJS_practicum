import React from 'react';
import { Button, Card, Form, Input, Upload, Typography, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, UseMutationResult } from '@tanstack/react-query';
import api from '../../config/request';
import { AxiosError } from 'axios';

const { Title, Text } = Typography;


const CompanySettings: React.FC = () => {
  const [form] = Form.useForm();

  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ['companySettings'],
    queryFn: () => api.get('/api/v1/admin/company').then((res) => res.data),
  });

  const updateCompanyMutation: UseMutationResult<any, AxiosError, FormData> = useMutation({
    mutationFn: (data: FormData) => api.patch('/api/v1/admin/company', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }), 
    onSuccess: () => {
      message.success('Company settings updated successfully');
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as any)?.error?.message || 'Company settings update failed';
      message.error(errorMessage);
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
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed`);
    }
  };

  return (
    <div className="company-settings-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        Company Settings
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
              label={<Text strong style={{ color: '#4a5568' }}>Company Name</Text>}
              name="name"
              rules={[{ required: true, message: 'Company name is required' }]}
              hasFeedback
            >
              <Input
                size="large"
                placeholder="Enter company name"
                style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
                aria-label="Company Name"
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>Company Details</Text>}
              name="details"
              rules={[{ required: true, message: 'Company details are required' }]}
              hasFeedback
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter company details"
                style={{ borderRadius: 8, borderColor: '#d9e2ec' }}
                aria-label="Company Details"
              />
            </Form.Item>

            <Form.Item
              label={<Text strong style={{ color: '#4a5568' }}>Logo</Text>}
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
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={updateCompanyMutation.isLoading}
                style={{
                  borderRadius: 8,
                  backgroundColor: updateCompanyMutation.isLoading ? '#a0aec0' : '#3182ce',
                  borderColor: updateCompanyMutation.isLoading ? '#a0aec0' : '#3182ce',
                  height: 48,
                  fontWeight: 500,
                  boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                }}
                aria-label="Company Settings Submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default CompanySettings;