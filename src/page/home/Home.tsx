"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button, Card, Col, Modal, Row, Statistic, Spin, Alert } from "antd"
import Title from "antd/es/typography/Title"
import EyesOn from "../../assets/svg/eyes-on.svg"
import EyesOff from "../../assets/svg/eyes-off.svg"
import Kashelok from "../../assets/svg/kashelok.svg"
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { debounce } from "lodash"
import { api } from "../../config/request"
import { loadState } from "../../config/storage"

const Home: React.FC = () => {
  const [eyesToggle, setEyesToggle] = useState(true)
  const [modal2Open, setModal2Open] = useState(false)
  const navigate = useNavigate()

  // Get token from storage
  const token = loadState("AccessToken")?.accessToken

  // Debounced navigation to prevent multiple clicks
  const debouncedNavigate = useCallback(
    debounce((path: string) => navigate(path), 300),
    [navigate],
  )

  // Main statistics query
  const {
    data: userStatistik,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const response = await api.get("/api/v1/store-statistics/main")
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
  })

  // Late payments statistics query
  const { data: userStatistikLate, isLoading: isLateLoading } = useQuery({
    queryKey: ["latePayments"],
    queryFn: async () => {
      const response = await api.get("/api/v1/store-statistics/late-payments")
      return response.data
    },
    retry: 1,
  })

  // Navigation handlers
  const handleCreateCustomer = () => debouncedNavigate("/debtors/add")
  const handleCreateDebt = () => debouncedNavigate("/create-debt")

  // Show loading state
  if (isLoading || isLateLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Spin size="large" />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <Alert
        message="Ma'lumotlarni yuklashda xatolik yuz berdi!"
        description="Iltimos, sahifani yangilang yoki administratorga murojaat qiling."
        type="error"
        style={{ margin: 24 }}
      />
    )
  }

  // Format data for display
  const totalDebt = userStatistik?.data?.total_debts || userStatistik?.totalDebt || 0
  const debtorsCount = userStatistik?.data?.debtors_count || userStatistik?.debtorsCount || 0
  const lateDebts = userStatistikLate?.lateDebts || userStatistikLate?.length || 0
  const walletAmount = userStatistik?.data?.wallet || userStatistik?.wallet || 0

  return (
    <Row
      style={{
        margin: "20px 36px",
        gap: "20px",
      }}
    >
      {/* Left Column */}
      <Col style={{ width: "49%" }}>
        {/* Total Credit Card */}
        <Row
          style={{
            padding: "27px 24px",
            background: "var(--primary-02)",
            borderRadius: "20px",
            width: "100%",
            alignItems: "center",
            margin: "0px 0px 20px 0px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Col flex="auto" style={{ textAlign: "center" }}>
            <Title
              level={3}
              style={{
                fontWeight: "700",
                fontSize: "26px",
                lineHeight: "140%",
                color: "var(--text)",
                margin: 0,
              }}
            >
              {eyesToggle ? `${totalDebt.toLocaleString()} so'm` : "******"}
            </Title>
            <Title
              level={3}
              style={{
                fontWeight: 600,
                fontSize: "15px",
                lineHeight: "157%",
                color: "var(--text)",
                margin: "10px 0px 0px 0px",
              }}
            >
              Umumiy nasiya
            </Title>
          </Col>
          <Button onClick={() => setEyesToggle(!eyesToggle)} style={{ border: "none", padding: 0 }}>
            {eyesToggle ? (
              <img src={EyesOn || "/placeholder.svg"} alt="Hide" width={"24px"} height={"24px"} />
            ) : (
              <img src={EyesOff || "/placeholder.svg"} alt="Show" width={"24px"} height={"24px"} />
            )}
          </Button>
        </Row>

        {/* Statistics Cards */}
        <Row style={{ width: "100%", gap: "20px" }}>
          {/* Late Payments Card */}
          <Row
            style={{
              background: "var(--primary-02)",
              borderRadius: "20px",
              padding: "20px 15px",
              width: "48%",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Col style={{ width: "100%" }}>
              <Card variant="borderless" style={{ border: "none", boxShadow: "none" }}>
                <Statistic
                  title={
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "17px",
                        lineHeight: "157%",
                        color: "var(--text)",
                        marginBottom: "8px",
                      }}
                    >
                      Kechiktirilgan to'lovlar
                    </p>
                  }
                  value={lateDebts}
                  valueStyle={{
                    color: "#cf1322",
                    fontWeight: 600,
                    fontSize: "30px",
                  }}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Customers Count Card */}
          <Row
            style={{
              background: "var(--primary-02)",
              borderRadius: "20px",
              width: "48%",
              padding: "20px 15px",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Col style={{ width: "100%" }}>
              <Card variant="borderless" style={{ border: "none", boxShadow: "none" }}>
                <Statistic
                  title={
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "17px",
                        lineHeight: "157%",
                        color: "var(--text)",
                        marginBottom: "8px",
                      }}
                    >
                      Mijozlar soni
                    </p>
                  }
                  value={debtorsCount}
                  valueStyle={{
                    color: "#3f8600",
                    fontWeight: 600,
                    fontSize: "30px",
                  }}
                  prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Row>

        {/* Action Buttons */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              icon={<UserOutlined />}
              size="large"
              block
              onClick={handleCreateCustomer}
              style={{
                height: "auto",
                padding: "12px 0",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Yangi Mijoz Qo'shish
            </Button>
          </Col>
          <Col xs={24} sm={12}>
            <Button
              type="default"
              icon={<DollarOutlined />}
              size="large"
              block
              onClick={handleCreateDebt}
              style={{
                height: "auto",
                padding: "12px 0",
                borderColor: "#52c41a",
                color: "#52c41a",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Yangi Nasiya Berish
            </Button>
          </Col>
        </Row>
      </Col>

      {/* Right Column */}
      <Col style={{ width: "49%" }}>
        {/* Wallet Card */}
        <Col
          style={{
            padding: "25px 24px 28px 24px",
            background: "var(--primary-02)",
            borderRadius: "20px",
            width: "100%",
            flex: "0 0 100%",
            marginBottom: "15px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Title
            level={3}
            style={{
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "157%",
              color: "var(--text)",
              margin: "0px 0px 20px 0px",
            }}
          >
            Hamyoningiz
          </Title>
          <Row align={"middle"} style={{ gap: "20px" }}>
            <Col
              style={{
                padding: "12px 14px 10px 14px",
                borderRadius: "100%",
                backgroundColor: "rgba(115, 92, 216, 0.1)",
                alignItems: "center",
              }}
            >
              <img src={Kashelok || "/placeholder.svg"} alt="Wallet" />
            </Col>
            <Col>
              <Title
                level={4}
                style={{
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: "157%",
                  color: "var(--text)",
                  margin: "0px",
                }}
              >
                Hisobingizda
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "157%",
                  color: "var(--text)",
                  margin: "0px",
                }}
              >
                {walletAmount.toLocaleString()} so'm
              </Title>
            </Col>
            <Col style={{ marginLeft: "auto" }}>
              <Button
                style={{
                  padding: "20px 14px",
                  borderRadius: "100%",
                  backgroundColor: "var(--brand)",
                }}
                onClick={() => setModal2Open(true)}
              >
                <PlusOutlined style={{ color: "#fff" }} />
              </Button>
            </Col>
          </Row>
        </Col>

        {/* Payment Status Card */}
        <Row
          style={{
            padding: "20px 24px",
            background: "var(--primary-02)",
            borderRadius: "20px",
            width: "100%",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Title
            level={4}
            style={{
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "157%",
              color: "var(--text)",
              margin: "0px",
            }}
          >
            Bu oy uchun to'lov:
          </Title>
          <Title
            level={4}
            style={{
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "157%",
              color: walletAmount > 200000 ? "green" : "red",
              margin: "0px",
            }}
          >
            {walletAmount > 200000 ? "To'lov qilingan" : "To'lov qilinmagan"}
          </Title>
        </Row>
      </Col>

      {/* Modal for Wallet Top-up */}
      <Modal
        title="Hisob"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Title
          level={3}
          style={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "157%",
            color: "var(--text)",
            marginBottom: "20px",
          }}
        >
          Hisobingizni to'ldirish uchun administratorlar bilan bog'laning
        </Title>
      </Modal>
    </Row>
  )
}

export default Home

