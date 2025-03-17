"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  DatabaseOutlined,
  DollarOutlined,
  QrcodeOutlined,
  ShopOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, Modal, Row, Col, Typography, Avatar, Space, Badge, Dropdown, message } from "antd"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useGetUserCheck } from "../page/login/service/useGetUserCheck"
import { loadState } from "../config/storage"
import { api } from "../config/request"
import EssyCeditLogo from "../assets/svg/Easycredit-logo.svg"
import Calendar from "../assets/svg/kalendar.svg"
import "./layout.css"

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

const MainLayout: React.FC = () => {
  const { isLoading, error, data } = useGetUserCheck()
  const [modal2Open, setModal2Open] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const accessToken = loadState("AccessToken")?.accessToken
  const user = loadState("user")

  // Page title mapping
  const locationPath: Record<string, string> = {
    "/": "Bosh sahifa",
    "/debtors": "Mijozlar",
    "/debtors/add": "Mijoz Yaratish",
    "/profile": "Mijoz Hisobi",
    "/create-customer": "Mijoz Yaratish",
    "/create-debt": "Nasiya Berish",
    "/add-payment": "To'lov Qabul Qilish",
    "/payment-history": "To'lov Tarixi",
    "/qr-payment": "QR Kod orqali To'lov",
    "/calendar": "Kalendar",
    "/late-payments": "Kechiktirilgan To'lovlar",
    "/top-debtors": "Eng Faol Mijozlar",
    "/export-import": "Excel Eksport/Import",
    "/company-settings": "Kompaniya Sozlamalari",
    "/user-management": "Foydalanuvchilar",
    "/notification-settings": "Bildirishnoma Sozlamalari",
  }

  // Get current page name
  const getCurrentPageName = () => {
    if (location.pathname.startsWith("/debtor/")) return "Mijoz"
    if (location.pathname.startsWith("/debt/")) return "Credit"
    return locationPath[location.pathname] || "Sahifa Topilmadi"
  }

  // Check authentication
  useEffect(() => {
    if ((!isLoading && error) || !accessToken) {
      navigate("/login", { replace: true, state: { from: location } })
    }
  }, [navigate, error, isLoading, accessToken, location])

  // Logout function
  const handleLogout = async () => {
    try {
      await api.post("/api/v1/auth/logout")
      localStorage.clear()
      navigate("/login", { replace: true })
      message.success("Muvaffaqiyatli chiqildi")
    } catch (error) {
      message.error("Chiqishda xatolik yuz berdi!")
    }
    setModal2Open(false)
  }

  // Menu items
  const menuItems = [
    {
      key: "1",
      icon: <MenuFoldOutlined />,
      label: "Bosh sahifa",
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Mijozlar",
      children: [
        {
          key: "2-1",
          icon: <UserOutlined />,
          label: "Mijozlar",
          onClick: () => navigate("/debtors"),
        },
        {
          key: "2-2",
          icon: <UserAddOutlined />,
          label: "Mijoz Yaratish",
          onClick: () => navigate("/debtors/add"),
        },
      ],
    },
    {
      key: "3",
      icon: <DollarOutlined />,
      label: "Nasiya Berish",
      onClick: () => navigate("/create-debt"),
    },
    {
      key: "4",
      icon: <DollarOutlined />,
      label: "To'lov Qabul Qilish",
      onClick: () => navigate("/add-payment"),
    },
    {
      key: "5",
      icon: <DollarOutlined />,
      label: "To'lov Tarixi",
      onClick: () => navigate("/payment-history"),
    },
    {
      key: "6",
      icon: <QrcodeOutlined />,
      label: "QR Kod orqali To'lov",
      onClick: () => navigate("/qr-payment"),
    },
    {
      key: "7",
      icon: <DatabaseOutlined />,
      label: "Hisobotlar",
      children: [
        {
          key: "7-1",
          label: "Kalendar",
          onClick: () => navigate("/calendar"),
        },
        {
          key: "7-2",
          label: "Kechiktirilgan To'lovlar",
          onClick: () => navigate("/late-payments"),
        },
        {
          key: "7-3",
          label: "Eng Faol Mijozlar",
          onClick: () => navigate("/top-debtors"),
        },
        {
          key: "7-4",
          label: "Excel Eksport/Import",
          onClick: () => navigate("/export-import"),
        },
      ],
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      label: "Sozlamalar",
      children: [
        {
          key: "8-1",
          label: "Kompaniya Sozlamalari",
          onClick: () => navigate("/company-settings"),
        },
        ...(user?.role === "admin"
          ? [
              {
                key: "8-2",
                label: "Foydalanuvchilar",
                onClick: () => navigate("/user-management"),
              },
            ]
          : []),
        {
          key: "8-3",
          label: "Bildirishnoma Sozlamalari",
          onClick: () => navigate("/notification-settings"),
        },
        {
          key: "8-4",
          icon: <UserOutlined />,
          label: "Profile",
          onClick: () => navigate("/profile"),
        },
      ],
    },
  ]

  // Dropdown menu for user profile
  const profileMenu = {
    items: [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "Profil",
        onClick: () => navigate("/profile"),
      },
      {
        key: "2",
        icon: <LogoutOutlined />,
        label: "Chiqish",
        onClick: () => setModal2Open(true),
      },
    ],
  }

  // If loading or error, return null
  if (isLoading) return null

  return (
    <Layout style={{ minHeight: "100vh" }} className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          backgroundColor: "var(--neutral-05, #1a202c)",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
          position: "fixed",
          height: "100vh",
          overflow: "auto",
          zIndex: 100,
        }}
      >
        <div
          className="logo-container"
          style={{
            padding: "24px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {collapsed ? (
            <ShopOutlined
              style={{
                fontSize: "32px",
                color: "#fff",
                transition: "all 0.3s ease",
              }}
            />
          ) : (
            <img src={EssyCeditLogo || "/placeholder.svg"} alt="Logo" style={{ width: "80%" }} />
          )}
          {!collapsed && (
            <Typography.Title level={4} style={{ color: "#fff", margin: "16px 0 0" }}>
              Nasiya
            </Typography.Title>
          )}
        </div>
        <Menu
          theme="dark"
          style={{ backgroundColor: "var(--neutral-05, #1a202c)" }}
          mode="inline"
          defaultSelectedKeys={[location.pathname === "/" ? "1" : ""]}
          defaultOpenKeys={[
            location.pathname.startsWith("/debtors") ? "2" : "",
            location.pathname.startsWith("/profile") ? "8" : "",
          ]}
          items={menuItems}
        />
        {!collapsed && (
          <Button
            onClick={() => setModal2Open(true)}
            className="logout_btn"
            danger
            style={{
              position: "absolute",
              bottom: "20px",
              left: "16px",
              right: "16px",
              borderRadius: "8px",
            }}
            icon={<LogoutOutlined />}
          >
            Chiqish
          </Button>
        )}
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header
          style={{
            padding: "0 24px",
            background: "var(--primary-02, #ffffff)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Space>
            <Badge count={5} dot>
              <BellOutlined style={{ fontSize: "20px" }} />
            </Badge>
            <Dropdown menu={profileMenu} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar src={data?.data?.image} icon={!data?.data?.image && <UserOutlined />} />
                <Text strong>{data?.data?.fullname || data?.data?.name || user?.name || "Foydalanuvchi"}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px",
            background: "var(--primary-02, #F2F5FA)",
            borderRadius: "12px",
          }}
        >
          <Row
            style={{
              margin: "0 0 24px 0",
              padding: "22px 24px",
              background: "var(--primary-02, #ffffff)",
              borderRadius: "12px",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Col>
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "122%",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Dashboard
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "157%",
                  color: "var(--text)",
                  margin: "4px 0 0 0",
                }}
              >
                {getCurrentPageName()}
              </Title>
            </Col>
            {location.pathname === "/" && (
              <Button
                style={{
                  padding: "12px",
                  height: "auto",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => navigate("/calendar")}
              >
                <img src={Calendar || "/placeholder.svg"} alt="" width={"24px"} height={"24px"} />
              </Button>
            )}
          </Row>
          <div
            style={{
              padding: "24px",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Chiqishni tasdiqlash"
        centered
        open={modal2Open}
        onOk={handleLogout}
        onCancel={() => setModal2Open(false)}
        okText="Ha, chiqish"
        cancelText="Bekor qilish"
      >
        <p>Platformadan chiqishni xohlaysizmi?</p>
      </Modal>
    </Layout>
  )
}

export default MainLayout