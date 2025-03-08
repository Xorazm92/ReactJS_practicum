import React from "react";
import { Card, Row, Col, Typography, Statistic, Alert, Spin, Button } from "antd";
import { DollarOutlined, UserOutlined, WarningOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import api from "../../config/request"; // Sizning API konfiguratsiyangiz
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { t } = useTranslation();

  // API so'rovlari - sizning backenddagi endpointlarga moslashtirildi
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => api.get("/api/v1/store-statistics/main").then((res) => res.data),
  });

  const { data: latePayments, isLoading: isLateLoading } = useQuery({
    queryKey: ["latePayments"],
    queryFn: () => api.get("/api/v1/store-statistics/late-payments").then((res) => res.data),
  });

  // Loading holati
  if (isLoading || isLateLoading) {
    return <Spin size="large" style={{ display: "block", margin: "auto", padding: "50px" }} />;
  }

  // Error holati
  if (error) {
    return <Alert message={t("dashboard.error")} type="error" style={{ margin: 24 }} />;
  }

  return (
    <div className="dashboard-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: "#1a202c", marginBottom: 24 }}>
        {t("dashboard.title")}
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#fff", // Agar --primary-02 aniqlanmagan bo‘lsa, standart rang
            }}
          >
            <Statistic
              title={t("dashboard.totalDebt")}
              value={stats?.totalDebt || 0}
              precision={2} // Agar summa katta bo‘lsa, o‘nlik qismini ko‘rsatish uchun
              formatter={(value) => `${value.toLocaleString()} so‘m`}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3182ce", fontWeight: 600, fontSize: "24px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Statistic
              title={t("dashboard.debtorsCount")}
              value={stats?.debtorsCount || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3182ce", fontWeight: 600, fontSize: "24px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Statistic
              title={t("dashboard.latePayments")}
              value={stats?.latePaymentsCount || 0}
              prefix={<WarningOutlined />}
              valueStyle={{ color: "#f5222d", fontWeight: 600, fontSize: "24px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <Statistic
              title={t("dashboard.wallet")}
              value={stats?.walletBalance || 0}
              precision={2}
              formatter={(value) => `${value.toLocaleString()} so‘m`}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#52c41a", fontWeight: 600, fontSize: "24px" }}
            />
            <Button
              style={{
                marginTop: 16,
                padding: "10px",
                borderRadius: "50%",
                backgroundColor: "#1890ff", // Agar --brand aniqlanmagan bo‘lsa, standart rang
              }}
              onClick={() => alert("Hisobni to‘ldirish uchun admin bilan bog‘laning")}
            >
              <PlusOutlined style={{ color: "#fff" }} />
            </Button>
          </Card>
        </Col>
      </Row>

      <Title level={4} style={{ color: "#1a202c", marginBottom: 16 }}>
        {t("dashboard.latePaymentsTitle")}
      </Title>
      {latePayments?.length > 0 ? (
        latePayments.map((payment: any, index: number) => (
          <Alert
            key={index}
            message={`${t("dashboard.debtor")}: ${payment.debtorName}`}
            description={`${t("dashboard.debt")}: ${payment.debtAmount.toLocaleString()} so‘m | ${t("dashboard.dueDate")}: ${payment.dueDate}`}
            type="warning"
            showIcon
            style={{ marginBottom: 8, borderRadius: 8 }}
          />
        ))
      ) : (
        <Text style={{ color: "#a0aec0" }}>{t("dashboard.noLatePayments")}</Text>
      )}
    </div>
  );
};

export default Home;