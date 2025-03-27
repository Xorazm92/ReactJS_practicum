import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import type { FC } from "react";
import { useAuthUser } from "react-auth-kit";
import { InputsType, UserType } from "../../../../@types";
import { useHandler } from "../../../../generic/handler";

const Details: FC = () => {
  const grid_style_form_item =
    "grid grid-cols-2 gap-4 max-[585px]:grid-cols-1 max-[585px]:gap-2";
  const auth: UserType = useAuthUser()() ?? {};
  const { updateUser } = useHandler();
  const postDetailts = async (e: InputsType) => {
    return updateUser({
      ...e, //oldingi datalar
      _id: auth._id, //id
      // rasm
      profile_photo:
        "https://alqadir.edu.pk/wp-content/uploads/2022/09/BS-Islamic-Studies-2022.jpg",
    });
  };
  return (
    <div>
      <Form
        onFinish={postDetailts}
        layout="vertical"
        fields={[
          { name: ["name"], value: auth?.name },
          { name: ["surname"], value: auth?.surname },
          { name: ["email"], value: auth?.email },
          { name: ["phone_number"], value: auth?.phone_number },
          { name: ["username"], value: auth?.username },
        ]}
      >
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="name"
            label="First name"
            rules={[{ required: true, message: "Please enter First name" }]}
          >
            <Input
              className="h-[35px] text-[16px]"
              placeholder="Type your first name..."
            />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true, message: "Please enter Last name" }]}
          >
            <Input
              className="h-[35px] text-[16px]"
              placeholder="Type your Last name..."
            />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="email"
            label="Email adress"
            rules={[{ required: true, message: "Please enter Email adress" }]}
          >
            <Input
              className="h-[35px] text-[16px]"
              placeholder="Type your Email adress..."
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone number"
            rules={[{ required: true, message: "Please enter Phone number" }]}
          >
            <Input
              addonBefore="+998"
              className="h-[35px] text-[16px]"
              placeholder="Type your Phone number..."
            />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter Username" }]}
          >
            <Input
              className="h-[35px] text-[16px]"
              placeholder="Type your Username..."
            />
          </Form.Item>
          <Form.Item
            name="profile_photo"
            label="Image"
            rules={[{ required: true, message: "Please enter File" }]}
          >
            <Upload
              name="image"
              action={
                "https://greenshop.abduvoitov.com/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
              }
              listType="picture"
              data={{ type: "img" }}
              headers={{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }}
              accept=".png,.jpg,.jpeg"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <button className="bg-[#46A358] w-[150px] flex rounded-md items-center justify-center gap-1 text-base text-white h-[40px] px-[10px] mt-[15px]">
          Save changes
        </button>
      </Form>
    </div>
  );
};

export default Details;
