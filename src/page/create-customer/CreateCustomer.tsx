import React from 'react';
import { Button, Card, Form, Input, Upload, Typography, message, Spin, Select, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import api from '../../config/request';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const CreateCustomer: React .FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const createCustomerMutation = useMutation({
    mutationFn: (data: FormData) =>
      api.post('/api/v1/debtors', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      message.success(t('createCustomer.success'));
      navigate('/');
    },
    onError: () => {
      message.error(t('createCustomer.error'));
    },
  });

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('address', values.address || '');
    if (values.passportImage?.[0]?.originFileObj) {
      formData.append('images', values.passportImage[0].originFileObj);
    }

    createCustomerMutation.mutate(formData);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} ${t('createCustomer.fileUploaded')}`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${t('createCustomer.fileError')}`);
    }
  };

  return (
    <div className="create-customer-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        {t('createCustomer.title')}
      </Title>

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: 24,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createCustomer.nameLabel')}</Text>}
            name="name"
            rules={[{ required: true, message: t('createCustomer.nameRequired') }]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder={t('createCustomer.namePlaceholder')}
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label={t('createCustomer.nameLabel')}
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createCustomer.phoneLabel')}</Text>}
            name="phone"
            rules={[{ required: true, message: t('createCustomer.phoneRequired') }]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder={t('createCustomer.phonePlaceholder')}
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label={t('createCustomer.phoneLabel')}
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createCustomer.addressLabel')}</Text>}
            name="address"
            rules={[{ required: false }]}
          >
            <Input
              size="large"
              placeholder={t('createCustomer.addressPlaceholder')}
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label={t('createCustomer.addressLabel')}
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>{t('createCustomer.passportLabel')}</Text>}
            name="passportImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: t('createCustomer.passportRequired') }]}
            hasFeedback
          >
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              maxCount={1}
              accept="image/*"
              listType="picture-card"
              showUploadList={{ showPreviewIcon: false }}
              className="upload-component"
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
                {t('createCustomer.uploadButton')}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={createCustomerMutation.status === 'pending'}
              style={{
                borderRadius: 8,
                backgroundColor: createCustomerMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                borderColor: createCustomerMutation.status === 'pending' ? '#a0aec0' : '#3182ce',
                height: 48,
                fontWeight: 500,
                boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
                transition: 'all 0.2s ease',
              }}
              aria-label={t('createCustomer.submit')}
            >
              {createCustomerMutation.status === 'pending' && <Spin size="small" style={{ marginRight: 8 }} />}
              {t('createCustomer.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCustomer;