import React, { useEffect, useMemo } from 'react';
import { Card, Row, Col, Typography, Statistic, Alert, Spin, Button } from "antd";
import { DollarOutlined, UserOutlined, WarningOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; 
import { debounce } from 'lodash'; 
import api from "../../config/request"; 
import { loadState } from "../../config/storage"; 

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Tokenni bir martalik olish
  const token = useMemo(() => {
    const tokenData = loadState("AccessToken");
    return tokenData?.accessToken;
  }, []);

  // Navigatsiyani debounce qilish
  const debouncedNavigate = useMemo(
    () => debounce((path: string, options = {}) => navigate(path, options), 300),
    [navigate]
  );

  // Render sikllari sonini kamaytirish
  useEffect(() => {
    if (!token) {
      debouncedNavigate("/login");
    }
  }, [token, debouncedNavigate]);

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["dashboardStats", token],
    queryFn: async () => {
      if (!token) return null;
      const response = await api.get("/api/v1/store-statistics/main", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const { data: latePayments, isLoading: isLateLoading } = useQuery({
    queryKey: ["latePayments"],
    queryFn: async () => {
      const response = await api.get("/api/v1/store-statistics/late-payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("AccessToken");
        debouncedNavigate("/login", { 
          replace: true,
          state: { from: 'home' }
        });
      }
    },
    enabled: !!token,
  });

  // Handler functions for new buttons
  const handleCreateCustomer = () => {
    debouncedNavigate('/create-customer');
  };

  const handleCreateDebt = () => {
    debouncedNavigate('/create-debt');
  };

  // Yuklanish holati
  if (isLoading || isLateLoading) {
    return <Spin size="large" style={{ display: "block", margin: "auto", padding: "50px" }} />;
  }

  // Xato holati
  if (error) {
    return <Alert message="Statistikani yuklashda xatolik yuz berdi!" type="error" style={{ margin: 24 }} />;
  }

  return (
    <div className="dashboard-container" style={{ padding: 24 }}>
      <Title level={3} style={{ color: "#1a202c", marginBottom: 24 }}>
        Bosh Sahifa
      </Title>

      {/* Statistika kartalari */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
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
              title="Jami Qarzlar"
              value={stats?.totalDebt || 0}
              precision={2}
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
              title="Mijozlar Soni"
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
              title="Kechiktirilgan To'lovlar"
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
              title="Hamyon"
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
                backgroundColor: "#1890ff",
              }}
              onClick={() => alert("Hisobni to‘ldirish uchun admin bilan bog‘laning")}
            >
              <PlusOutlined style={{ color: "#fff" }} />
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Yangi qo'shimcha qism - Action Buttons */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={12}>
          <Button 
            type="primary" 
            icon={<UserOutlined />} 
            size="large" 
            block 
            onClick={handleCreateCustomer}
            style={{ 
              backgroundColor: '#1890ff', 
              borderRadius: 8 
            }}
          >
            Yangi Mijoz Qo'shish
          </Button>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Button 
            type="default" 
            icon={<DollarOutlined />} 
            size="large" 
            block 
            onClick={handleCreateDebt}
            style={{ 
              borderColor: '#52c41a', 
              color: '#52c41a', 
              borderRadius: 8 
            }}
          >
            Yangi Nasiya Berish
          </Button>
        </Col>
      </Row>

      {/* Kechiktirilgan to‘lovlar ro‘yxati */}
      <Title level={4} style={{ color: "#1a202c", marginBottom: 16 }}>
        Kechiktirilgan To'lovlar
      </Title>
      {latePayments?.length > 0 ? (
        latePayments.map((payment: any, index: number) => (
          <Alert
            key={index}
            message={`Mijoz: ${payment.debtorName}`}
            description={`Qarz: ${payment.debtAmount.toLocaleString()} so‘m | Muddat: ${payment.dueDate}`}
            type="warning"
            showIcon
            style={{ marginBottom: 8, borderRadius: 8 }}
          />
        ))
      ) : (
        <Text style={{ color: "#a0aec0" }}>Kechiktirilgan to'lovlar yo'q.</Text>
      )}
    </div>
  );
};

export default Home;