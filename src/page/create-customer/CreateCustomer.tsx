import { Button, Card, Form, Input, Typography, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

const { Title, Text } = Typography;

const CreateCustomer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Formni yuborish
  const onFinish = (values: any) => {
    console.log('Form ma’lumotlari:', values);
    message.success('Mijoz muvaffaqiyatli saqlandi!');
    navigate('/');
  };

  // Rasmni yuklash funksiyasi
  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} fayli yuklandi`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} faylini yuklashda xatolik yuz berdi`);
    }
  };

  return (
    <div
      style={{
        padding: '32px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '24px',
        }}
      >
        <Title level={3} style={{ textAlign: 'center', color: '#1a202c', marginBottom: 24 }}>
          Mijoz yaratish
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
          initialValues={{}}
        >
          {/* Ism */}
          <Form.Item
            label={<Text style={{ color: '#4a5568' }}>Ism*</Text>}
            name="ism"
            rules={[{ required: true, message: 'Ismni kiriting!' }]}
          >
            <Input
              size="large"
              placeholder="Ismni kiriting"
              style={{ borderRadius: 8, padding: '8px 12px' }}
            />
          </Form.Item>

          {/* Telefon raqami */}
          <Form.Item
            label={<Text style={{ color: '#4a5568' }}>Telefon raqami*</Text>}
            name="telefon"
            rules={[{ required: true, message: 'Telefon raqamini kiriting!' }]}
          >
            <Input
              size="large"
              placeholder="+998 90 123 45 67"
              style={{ borderRadius: 8, padding: '8px 12px' }}
            />
          </Form.Item>

          {/* Yashash manzili */}
          <Form.Item
            label={<Text style={{ color: '#4a5568' }}>Yashash manzili*</Text>}
            name="manzil"
            rules={[{ required: true, message: 'Manzilni kiriting!' }]}
          >
            <Input
              size="large"
              placeholder="Manzilni kiriting"
              style={{ borderRadius: 8, padding: '8px 12px' }}
            />
          </Form.Item>

          {/* Pasport rasmi */}
          <Form.Item
            label={<Text style={{ color: '#4a5568' }}>Pasport rasmini yuklash*</Text>}
            name="pasportRasm"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: 'Pasport rasmini yuklang!' }]}
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
                Rasmni tanlash
              </Button>
            </Upload>
          </Form.Item>

          {/* Saqlash tugmasi */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                borderRadius: 8,
                backgroundColor: '#3182ce',
                borderColor: '#3182ce',
                height: 48,
                fontWeight: 500,
                boxShadow: '0 2px 6px rgba(49, 130, 206, 0.3)',
              }}
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCustomer;