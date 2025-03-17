"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button, Form, Input, Typography, Card, Spin, message, Row, Col, Divider, Checkbox } from "antd"
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ArrowRightOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { api } from "../../config/request"
import { loadState, saveState } from "../../config/storage"
import { useGetUserCheck } from "./service/useGetUserCheck"
import LoginLogo from "../../assets/svg/login-logo.svg"

const { Title, Text, Paragraph } = Typography

interface LoginFormValues {
  login: string
  password: string
  remember?: boolean
}

interface LoginResponse {
  accessToken: string
  access_token_expire: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { data: userData, isLoading: checkLoading } = useGetUserCheck()
  const token = loadState("AccessToken")
  const [passwordVisible, setPasswordVisible] = useState(false)

  // Redirect to home if already authenticated
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true })
    }
  }, [token, navigate])

  // Login mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormValues) => api.post<LoginResponse>("/api/v1/auth/signin", data),
    onSuccess: (response) => {
      const { accessToken, access_token_expire } = response.data
      saveState("AccessToken", { accessToken, access_token_expire })
      message.success("Tizimga muvaffaqiyatli kirdingiz!")
      navigate("/", { replace: true })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error?.message || "Login yoki parol noto'g'ri!"
      form.setFields([
        { name: "login", errors: [errorMessage] },
        { name: "password", errors: [errorMessage] },
      ])
      message.error(errorMessage)
    },
  })

  // Form submission handler
  const onFinish = (values: LoginFormValues) => {
    mutate({
      login: values.login.trim(),
      password: values.password.trim(),
    })
  }

  if (checkLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          padding: 0,
          overflow: "hidden",
          background: "#ffffff",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row style={{ display: "flex", flexWrap: "nowrap" }}>
          {/* Brand Section */}
          <Col
            xs={0}
            sm={0}
            md={10}
            style={{
              background: "linear-gradient(135deg, #3182ce 0%, #2c5282 100%)",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <img
              src={LoginLogo || "/placeholder.svg"}
              alt="Logo"
              style={{
                maxWidth: "70%",
                height: "auto",
                marginBottom: "40px",
                filter: "brightness(0) invert(1)",
              }}
            />

            <Title
              level={2}
              style={{
                color: "#ffffff",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              Nasiya Tizimi
            </Title>

            <Paragraph
              style={{
                color: "#ffffff",
                textAlign: "center",
                fontSize: "16px",
                maxWidth: "80%",
              }}
            >
              Mijozlar va to'lovlarni boshqarish uchun zamonaviy platforma
            </Paragraph>
          </Col>

          {/* Form Section */}
          <Col xs={24} sm={24} md={14}>
            <div
              style={{
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ marginBottom: "40px" }}>
                <Title
                  level={2}
                  style={{
                    fontWeight: 700,
                    fontSize: "28px",
                    color: "#1a202c",
                    marginBottom: "8px",
                  }}
                >
                  Xush kelibsiz
                </Title>
                <Paragraph
                  style={{
                    color: "#718096",
                    fontSize: "16px",
                  }}
                >
                  Tizimga kirish uchun ma'lumotlaringizni kiriting
                </Paragraph>
              </div>

              <Form
                form={form}
                name="login_form"
                onFinish={onFinish}
                layout="vertical"
                style={{ width: "100%" }}
                requiredMark={false}
                size="large"
              >
                <Form.Item
                  label={
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: "#4a5568",
                      }}
                    >
                      Login
                    </Text>
                  }
                  name="login"
                  rules={[{ required: true, message: "Loginni kiriting!" }]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "#a0aec0" }} />}
                    placeholder="Login kiriting"
                    style={{
                      borderRadius: "8px",
                      height: "48px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: "#4a5568",
                      }}
                    >
                      Parol
                    </Text>
                  }
                  name="password"
                  rules={[{ required: true, message: "Parolni kiriting!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#a0aec0" }} />}
                    placeholder="Parol kiriting"
                    style={{
                      borderRadius: "8px",
                      height: "48px",
                    }}
                    iconRender={(visible) =>
                      visible ? (
                        <EyeTwoTone onClick={() => setPasswordVisible(!passwordVisible)} />
                      ) : (
                        <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                      )
                    }
                  />
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Eslab qolish</Checkbox>
                  </Form.Item>

                  <Link
                    to="/forgot-password"
                    style={{
                      color: "#3182ce",
                      fontWeight: 500,
                    }}
                  >
                    Parolni unutdingizmi?
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isPending}
                    style={{
                      height: "48px",
                      fontWeight: 600,
                      fontSize: "16px",
                      width: "100%",
                      borderRadius: "8px",
                      background: "#3182ce",
                      border: "none",
                    }}
                    icon={isPending ? null : <ArrowRightOutlined />}
                  >
                    {isPending ? "Kirish..." : "Kirish"}
                  </Button>
                </Form.Item>

                <Divider plain style={{ color: "#a0aec0", margin: "24px 0" }}>
                  Yordam kerakmi?
                </Divider>

                <div style={{ textAlign: "center" }}>
                  <Button
                    type="link"
                    href="#"
                    style={{
                      color: "#3182ce",
                      fontWeight: 500,
                      height: "auto",
                      padding: "8px 16px",
                    }}
                  >
                    Do'kon administratori bilan bog'lanish
                  </Button>
                </div>
              </Form>

              <div style={{ marginTop: "auto", textAlign: "center" }}>
                <Text
                  style={{
                    color: "#718096",
                    fontSize: "14px",
                  }}
                >
                  © {new Date().getFullYear()} Nasiya Tizimi. Barcha huquqlar himoyalangan.
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Login

