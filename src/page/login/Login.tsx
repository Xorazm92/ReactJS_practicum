import { Row, Col, Input, Button, Typography, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import LogoIcon from "../../assets/login.png";
import { Link } from "react-router-dom";
import { useLogin } from "./service/useLogin";
import { useQueryClient } from "@tanstack/react-query"; 
import { toast, ToastContainer } from "react-toastify";
import React from "react";

export const LoginPage = () => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [inputSt, setInputSt] = React.useState<boolean>(false);

    const { mutate, isPending } = useLogin();
    const client = useQueryClient();

    const onSubmit = (data: any) => {
        mutate(data, {
            onSuccess: () => {
                reset();
                client.invalidateQueries({ queryKey: ["user_data"] });
                toast.success("Todo added successfully!", {
                    position: "top-center",
                });
            },
            onError: (error) => {
                // @ts-ignore
                toast.error(error?.response?.data?.error?.message, {
                    position: "top-center",
                });
                setInputSt(true);
            },
        });
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                width: "100vw",
                height: "100vh",
                background: "#f5f7fa",
            }}
        >
            <ToastContainer />
            <Col
                style={{
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                <Col
                    span={12}
                    style={{
                        background: "#f5f7fa",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <Typography.Title
                        level={3}
                        style={{
                            color: "#1677ff",
                            fontWeight: "bold",
                            fontSize: "32px",
                        }}
                    >
                        Mijozlar
                    </Typography.Title>
                    <Typography.Text
                        style={{
                            fontWeight: "bold",
                            fontSize: "28px",
                            maxWidth: "300px",
                            textAlign: "center",
                        }}
                    >
                        Ishingizni samaraliroq boshqaring
                    </Typography.Text>
                    <img
                        src={LogoIcon}
                        alt="login"
                        style={{ marginTop: "20px" }}
                    />
                </Col>

                <Col
                    span={12}
                    style={{
                        display: "flex",
                        background: "white",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "80px 48px",
                        borderRadius: "16px",
                        boxShadow: "0 50px 100px 0 rgba(56, 131, 146, 0.1)",
                    }}
                >
                    <Typography.Title
                        level={3}
                        style={{
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: "bold",
                            paddingBottom: "36px",
                        }}
                    >
                        Xush kelibsiz
                    </Typography.Title>

                    <Form onFinish={handleSubmit(onSubmit)}>
                        <Typography.Text>Login</Typography.Text>
                        <Controller
                            name="login"
                            control={control}
                            rules={{ required: "Login kiriting!" }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    size="large"
                                    status={
                                        errors.login
                                            ? "error"
                                            : inputSt
                                            ? "error"
                                            : ""
                                    }
                                />
                            )}
                        />
                        {errors.login && (
                            <Typography.Paragraph style={{ color: "red" }}>
                                {errors.login.message as string}
                            </Typography.Paragraph>
                        )}

                        <Typography.Text>Parol</Typography.Text>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Parol kiriting!",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!",
                                },
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    size="large"
                                    status={
                                        errors.login
                                            ? "error"
                                            : inputSt
                                            ? "error"
                                            : ""
                                    }
                                />
                            )}
                        />
                        {errors.hashed_password && (
                            <Typography.Paragraph style={{ color: "red" }}>
                                {errors.hashed_password.message as string}
                            </Typography.Paragraph>
                        )}

                        <Typography.Text
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                paddingTop: "5px",
                                paddingBottom: "77px",
                            }}
                        >
                            <Link to={"/"} style={{ color: "#1677ff" }}>
                                Parolni unutdingizmi?
                            </Link>
                        </Typography.Text>

                        <Button
                            type="primary"
                            block
                            size="large"
                            htmlType="submit"
                            disabled={isPending}
                            style={{ marginTop: "15px" }}
                        >
                            Kirish
                        </Button>
                    </Form>

                    <Typography.Text
                        style={{ textAlign: "center", paddingTop: "24px" }}
                    >
                        Hali hisobingiz yo‘qmi?{" "}
                        <Link to={"/"} style={{ color: "#1677ff" }}>
                            Ro‘yxatdan o‘tish
                        </Link>
                    </Typography.Text>
                </Col>
            </Col>
        </Row>
    );
};
