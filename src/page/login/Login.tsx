import React, { useEffect, useState } from "react";
import { Button, Form, Input, Typography, Card, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/request"; // Sizning request faylingizdan api import qilindi
import { loadState, saveState } from "../../config/storage"; // Token saqlash uchun
import { useTranslation } from "react-i18next"; // Ko‘p tillilik uchun

const { Title, Text } = Typography;

// Login javob turi (backend bilan moslashish uchun)
interface LoginResponse {
  accessToken: string;
  access_token_expire: string;
}

// Forma qiymatlari turi
interface LoginFormValues {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Token borligini tekshirish va agar bor bo‘lsa, bosh sahifaga yo‘naltirish
  const token = loadState("AccessToken");
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Login so‘rovini yuborish uchun mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) =>
      api.post<LoginResponse>("/api/v1/auth/signin", data), // Sizning baseURL: http://localhost:3000/api/v1/auth/signin
    onSuccess: (data) => {
      const { accessToken, access_token_expire } = data.data;
      saveState("AccessToken", { accessToken, access_token_expire }); // Token saqlash
      message.success("Tizimga muvaffaqiyatli kirdingiz!");
      navigate("/", { replace: true }); // Bosh sahifaga yo‘naltirish
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error?.message || "Login yoki parol noto'g'ri!";
      form.setFields([
        { name: "login", errors: [errorMessage] }, // "Login yoki parol noto‘g‘ri!"
        { name: "password", errors: [errorMessage] },
      ]);
      message.error(errorMessage);
    },
    onSettled: () => setIsLoading(false), // Yuklanish holatini tugatish
  });

  // Forma yuborilganda ishlaydigan funksiya
  const onFinish = (values: LoginFormValues) => {
    setIsLoading(true);
    loginMutation.mutate({
      login: values.login.trim(),
      password: values.password.trim(),
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e6f7ff 0%, #f0f4f8 100%)", // Chiroyli gradient fon
        padding: "16px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soyali dizayn
          padding: "24px",
          background: "#fff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ color: "#1a202c", margin: 0 }}>
            Tizimga Kirish
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
          {/* Login maydoni */}
          <Form.Item
            label={<Text strong>Login</Text>}
            name="login"
            rules={[{ required: true, message: "Loginni kiriting!" }]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined style={{ color: "#a0aec0" }} />}
              size="large"
              placeholder="Login kiriting"
              style={{ borderRadius: 8, padding: "10px 12px" }}
            />
          </Form.Item>

          {/* Parol maydoni */}
          <Form.Item
            label={<Text strong>Parol</Text>}
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#a0aec0" }} />}
              size="large"
              placeholder="Parol kiriting"
              style={{ borderRadius: 8, padding: "10px 12px" }}
            />
          </Form.Item>

          {/* Kirish tugmasi */}
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
              }}
            >
              {isLoading && <Spin size="small" style={{ marginRight: 8 }} />}
              Kirish
            </Button>
          </Form.Item>

          {/* Parolni unutdingizmi? */}
          <Text style={{ display: "block", textAlign: "center", color: "#4a5568" }}>
            Parolingizni unutdingizmi?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
              style={{ color: "#3182ce", fontWeight: 500 }}
            >
              Parolni tiklash
            </a>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Login;