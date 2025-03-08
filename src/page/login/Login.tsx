import React, { useState, useEffect } from "react";
import { Button, Form, Input, Typography, Card, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../config/request";
import { saveState } from "../../config/storage";
import loginImage from "../../assets/login.png";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface LoginResponse {
  accessToken: string;
  access_token_expire: string;
}

interface LoginFormValues {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) =>
      api.post<LoginResponse>("/api/v1/auth/signin", data),
    onSuccess: (data) => {
      const { accessToken, access_token_expire } = data.data;
      saveState("AccessToken", { accessToken, access_token_expire });
      message.success(t("login.success"));
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error?.message || t("login.error");
      message.error(errorMessage);
      form.setFields([
        { name: "login", errors: [errorMessage] },
        { name: "password", errors: [errorMessage] },
      ]);
    },
    onSettled: () => setIsLoading(false),
  });

  const onFinish = (values: LoginFormValues) => {
    setIsLoading(true);
    loginMutation.mutate({
      login: values.login.trim(),
      password: values.password.trim(),
    });
  };

  return (
    <div
      className="login-container"
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
        className="login-card"
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
          <img
            src={loginImage}
            alt={t("login.logoAlt")}
            style={{ maxWidth: "120px", height: "auto", marginBottom: 16 }}
          />
          <Title level={3} style={{ color: "#1a202c", margin: 0 }}>
            {t("login.title")}
          </Title>
        </div>

        <Form
          form={form}
          name="login_form"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 400, margin: "0 auto" }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label={<Text strong style={{ color: "#4a5568" }}>{t("login.loginLabel")}</Text>}
            name="login"
            rules={[{ required: true, message: t("login.loginRequired") }]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined style={{ color: "#a0aec0" }} />}
              size="large"
              placeholder={t("login.loginPlaceholder")}
              style={{ borderRadius: 8, padding: "10px 12px", borderColor: "#d9e2ec" }}
            />
          </Form.Item>

          <Form.Item
            label={<Text strong style={{ color: "#4a5568" }}>{t("login.passwordLabel")}</Text>}
            name="password"
            rules={[{ required: true, message: t("login.passwordRequired") }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#a0aec0" }} />}
              size="large"
              placeholder={t("login.passwordPlaceholder")}
              style={{ borderRadius: 8, padding: "10px 12px", borderColor: "#d9e2ec" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={isLoading}
              style={{
                borderRadius: 8,
                backgroundColor: isLoading ? "#a0aec0" : "#3182ce",
                borderColor: isLoading ? "#a0aec0" : "#3182ce",
                height: 48,
                fontWeight: 500,
                boxShadow: "0 2px 6px rgba(49, 130, 206, 0.3)",
              }}
            >
              {isLoading && <Spin size="small" style={{ marginRight: 8 }} />}
              {t("login.submit")}
            </Button>
          </Form.Item>

          <Text style={{ display: "block", textAlign: "center", marginTop: 16, color: "#4a5568" }}>
            {t("login.forgot")}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
              style={{ color: "#3182ce", fontWeight: 500 }}
            >
              {t("login.forgotLink")}
            </a>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Login;