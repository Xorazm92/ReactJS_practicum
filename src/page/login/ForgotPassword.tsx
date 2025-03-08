import React from "react";
import { Button, Form, Input, Typography, Card, message, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../config/request";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: { login: string }) => api.post("/api/v1/auth/create-passcode", data),
    onSuccess: () => {
      message.success(t("forgot.success"));
      navigate("/login");
    },
    onError: () => {
      message.error(t("forgot.error"));
    },
  });

  const onFinish = (values: { login: string }) => {
    forgotPasswordMutation.mutate({ login: values.login.trim() });
  };

  return (
    <div
      className="forgot-password-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e6f7ff 0%, #f0f4f8 100%)",
        padding: "16px",
      }}
    >
      <Card
        className="forgot-password-card"
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          background: "#fff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ color: "#1a202c", margin: 0 }}>
            {t("forgot.title")}
          </Title>
        </div>

        <Form
          form={form}
          name="forgot_password_form"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          <Form.Item
            label={<Text strong style={{ color: "#4a5568" }}>{t("forgot.loginLabel")}</Text>}
            name="login"
            rules={[{ required: true, message: t("forgot.loginRequired") }]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined style={{ color: "#a0aec0" }} />}
              size="large"
              placeholder={t("forgot.loginPlaceholder")}
              style={{ borderRadius: 8, padding: "10px 12px", borderColor: "#d9e2ec" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={forgotPasswordMutation.isPending}
              style={{
                borderRadius: 8,
                backgroundColor: forgotPasswordMutation.isPending ? "#a0aec0" : "#3182ce",
                borderColor: forgotPasswordMutation.isPending ? "#a0aec0" : "#3182ce",
                height: 48,
                fontWeight: 500,
                boxShadow: "0 2px 6px rgba(49, 130, 206, 0.3)",
              }}
            >
              {forgotPasswordMutation.isPending && (
                <Spin size="small" style={{ marginRight: 8 }} />
              )}
              {t("forgot.submit")}
            </Button>
          </Form.Item>

          <Text style={{ display: "block", textAlign: "center", marginTop: 16, color: "#4a5568" }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              style={{ color: "#3182ce", fontWeight: 500 }}
            >
              {t("forgot.back")}
            </a>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;