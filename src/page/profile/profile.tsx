import {
  Button,
  Col,
  Flex,
  Image,
  Input,
  Modal,
  Row,
  Spin,
  Upload,
  UploadProps,
  Form,
} from "antd";
import Title from "antd/es/typography/Title";
import { LoadingOutlined, EditOutlined } from "@ant-design/icons";
import { useGetUserProfile } from "../../layout/service/useGetUserProfile";
import { useState } from "react";
import { usePostUploadImg } from "./service/mutate/usePostUploadImg";
import { client } from "../../config/query-client";
export const Profile = () => {
  const { data, isLoading } = useGetUserProfile();
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const { mutate, isPending } = usePostUploadImg();
  const changeUpload: UploadProps["onChange"] = ({ file }) => {
    if (file.originFileObj && !isPending) {
      mutate(file.originFileObj, {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["user_profile"] });
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  const changePassword = (values: any) => {
    console.log(values);
  };
  return (
    <>
      {isLoading ? (
        <Flex
          align="center"
          justify="center"
          gap="middle"
          style={{
            margin: " 20px  36px",
            gap: "22px",
            height: "50vh",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      ) : (
        <Row
          style={{
            margin: " 20px  36px",
            gap: "25px",
          }}
        >
          <Col
            style={{
              width: "40%",
            }}
          >
            <Col
              style={{
                padding: "27px 50px",
                background: "var(--primary-02)",
                borderRadius: "20px",
                width: "100%",
                margin: "0px 0px 20px 0px",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 600,
                  fontSize: "32px",
                  color: "var(--text)",
                  margin: "0px",
                }}
              >
                Shaxsiy ma'lumotlar
              </Title>
            </Col>
            <Col
              style={{
                padding: "27px 50px",
                background: "var(--primary-02)",
                borderRadius: "20px",
                width: "100%",
                margin: "0px 0px 20px 0px",
                position: "relative",
              }}
            >
              <Button
                onClick={() => setModal2Open(true)}
                style={{
                  border: "none",
                  borderRadius: "100%",
                  padding: "10px 10px",
                  position: "absolute",
                  right: 20,
                  top: 20,
                }}
              >
                <EditOutlined style={{ fontSize: "22px" }} />
              </Button>
              <Row justify={"center"}>
                <Row
                  style={{
                    position: "relative",
                    width: 200,
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isPending ? (
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                      }
                    />
                  ) : (
                    <Image
                      width={200}
                      height={200}
                      src={data?.data?.image}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Row
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 170,
                      cursor: "pointer",
                    }}
                  >
                    <Upload
                      name="avatar"
                      className="avatar-uploader"
                      showUploadList={false}
                      onChange={changeUpload}
                    >
                      <EditOutlined style={{ fontSize: "22px" }} />
                    </Upload>
                  </Row>
                </Row>
              </Row>
              <ul
                style={{
                  listStyle: "none",
                  margin: "35px 20px 20px 20px",
                }}
              >
                <li>
                  {" "}
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text)",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    Ismi familiya
                  </Title>
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "var(--text)",
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    {data?.data?.fullname}
                  </Title>
                </li>
                <li>
                  {" "}
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text)",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    Telefon raqam
                  </Title>
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "var(--text)",
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    {data?.data?.phone_number}
                  </Title>
                </li>
                <li>
                  {" "}
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "var(--text)",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    Elektron pochta
                  </Title>
                  <Title
                    level={3}
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "var(--text)",
                      margin: "0px 0px 20px 0px",
                    }}
                  >
                    {data?.data?.email}
                  </Title>
                </li>
              </ul>
            </Col>
          </Col>
          <Col style={{ width: "30%" }}>
            <Col
              style={{
                padding: "27px 40px 27px 50px",
                background: "var(--primary-02)",
                borderRadius: "10px",
                width: "100%",
                height: "160px",
                margin: "0px 0px 20px 0px",
              }}
            >
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "var(--text)",
                  margin: "0px 0px 45px 0px",
                }}
              >
                Login
              </Title>
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "var(--text)",
                  margin: "0px ",
                }}
              >
                {data?.data?.login}
              </Title>
            </Col>
            <Col
              style={{
                padding: "27px 40px 27px 50px",
                background: "var(--primary-02)",
                borderRadius: "10px",
                width: "100%",
                height: "160px",
                margin: "0px 0px 20px 0px",
              }}
            >
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "var(--text)",
                    margin: "0px 0px 5px 0px",
                  }}
                >
                  Parol
                </Title>
                <Button
                  onClick={() => setModal1Open(true)}
                  style={{
                    border: "none",
                    borderRadius: "100%",
                    padding: "10px 10px",
                  }}
                >
                  <EditOutlined style={{ fontSize: "22px" }} />
                </Button>
              </Row>
              <Title
                level={3}
                style={{
                  fontWeight: 700,
                  fontSize: "50px",
                  color: "var(--text)",
                  margin: "0px ",
                }}
              >
                .........
              </Title>
            </Col>
          </Col>
          <Modal
            title={
              modal1Open ? (
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "122%",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  Parolni o‘zgartirish
                </Title>
              ) : modal2Open ? (
                <Title
                  level={3}
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "122%",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  Shaxsiy malumotlar
                </Title>
              ) : null
            }
            centered
            open={modal2Open || modal1Open}
            onOk={() => (modal2Open ? form.submit() : changePassword)}
            onCancel={() => {
              setModal2Open(false), setModal1Open(false);
            }}
            okText="Saqlash"
            okButtonProps={{
              style: {
                backgroundColor: "#1677ff",
                borderRadius: "8px",
                width: "100%",
                padding: "20px 30px",
                margin: 0,
              },
            }}
            cancelButtonProps={{ style: { display: "none" } }}
            style={{ padding: "30px" }}
          >
            {modal2Open ? (
              <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: 400, margin: "20px 0" }}
                variant={"filled"}
                onFinish={onFinish}
              >
                <Form.Item
                  label={
                    <Title
                      level={3}
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        lineHeight: "122%",
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      Ismi familiya
                    </Title>
                  }
                  initialValue={data?.data?.fullname}
                  name="fullname"
                  rules={[{ required: true, message: "Ism familiya kiriting" }]}
                >
                  <Input style={{ padding: "10px 10px" }} />
                </Form.Item>
                <Form.Item
                  label={
                    <Title
                      level={3}
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        lineHeight: "122%",
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      Telefon raqam
                    </Title>
                  }
                  initialValue={data?.data?.phone_number}
                  name="phone_number"
                  rules={[
                    { required: true, message: "Telifon raqam Kiriting" },
                  ]}
                >
                  <Input style={{ padding: "10px 10px" }} />
                </Form.Item>
                <Form.Item
                  label={
                    <Title
                      level={3}
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                        lineHeight: "122%",
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      Elektron pochta
                    </Title>
                  }
                  initialValue={data?.data?.email}
                  name="email"
                  rules={[
                    { required: true, message: "Emailni kiriting!" },
                    { type: "email", message: "Noto‘g‘ri email formati!" },
                  ]}
                >
                  <Input style={{ padding: "10px 10px" }} />
                </Form.Item>
              </Form>
            ) : modal1Open ? (
              "Password"
            ) : null}
          </Modal>
        </Row>
      )}
    </>
  );
};
