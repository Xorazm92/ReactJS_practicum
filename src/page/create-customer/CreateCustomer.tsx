import React from 'react';
import { Button, Card, Form, Input, Upload, Typography, message, Spin, Select, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { api } from '../../config/request';
import { AxiosError } from 'axios';

const { Title, Text } = Typography;

const CreateCustomer: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const createCustomerMutation: UseMutationResult<any, AxiosError, FormData> = useMutation({
    mutationFn: (data: FormData) =>
      api.post('/api/v1/debtors', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      message.success('Mijoz muvaffaqiyatli yaratildi!');
      navigate('/');
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as any)?.error?.message || 'Mijozni yaratishda xatolik yuz berdi!';
      message.error(errorMessage);
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
      message.success(`${info.file.name} fayli yuklandi`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} faylini yuklashda xatolik yuz berdi`);
    }
  };

  return (
    <div className="create-customer-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: '#1a202c', marginBottom: 24 }}>
        Mijoz Yaratish
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
            label={<Text strong style={{ color: '#4a5568' }}>Mijoz Ismi</Text>}
            name="name"
            rules={[{ required: true, message: 'Mijoz ismini kiriting!' }]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder="Mijoz ismini kiriting"
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label="Mijoz Ismi"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>Telefon Raqami</Text>}
            name="phone"
            rules={[{ required: true, message: 'Telefon raqamini kiriting!' }]}
            hasFeedback
          >
            <Input
              size="large"
              placeholder="Telefon raqamini kiriting"
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label="Telefon Raqami"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>Manzil</Text>}
            name="address"
            rules={[{ required: false }]}
          >
            <Input
              size="large"
              placeholder="Manzilni kiriting (ixtiyoriy)"
              style={{ borderRadius: 8, padding: '10px 12px', borderColor: '#d9e2ec' }}
              aria-label="Manzil"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: '#4a5568' }}>Passport Rasmi</Text>}
            name="passportImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: 'Passport rasmini yuklang!' }]}
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
                Passport Rasmini Yuklash
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={createCustomerMutation.isLoading}
              style={{
                borderRadius: 8,
                backgroundColor: createCustomerMutation.isLoading ? '#a0aec0' : '#3182ce',
                borderColor: createCustomerMutation.isLoading ? '#a0aec0' : '#3182ce',
                height: 48,
                fontWeight: 500,
                boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
              }}
              aria-label="Mijoz Yaratish"
            >
              Mijoz Yaratish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCustomer;