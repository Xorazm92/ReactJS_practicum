import { Form, Input } from "antd";
import type { FC } from "react";
import { useAuthUser } from "react-auth-kit";
import { UserType } from "../../../../@types";
import { useHandler } from "../../../../generic/handler";

const Adress: FC = () => {
  interface FormTypeAdress {
    name: string;
    surname: string;
    phone_number: string;
    email: string;
    country: string;
    street_address: string;
    zip: string;
    town: string;
    state: string;
    additional_street_address: string;
  }
  const auth: UserType = useAuthUser()() ?? {};
  const { updateAdress } = useHandler();
  const updaterCookie = (e: FormTypeAdress) => {
    const adressform = {
      name: e.name,
      email: e.email,
      surname: e.surname,
      phone_number: e.phone_number,
      billing_address: {
        additional_street_address: e.additional_street_address,
        country: e.country,
        state: e.state,
        street_address: e.street_address,
        town: e.street_address,
        zip: e.zip,
      },
    };
    updateAdress({ data: adressform, e: { ...e, id: auth._id } });
  };
  const grid_style_form_item =
    "grid grid-cols-2 gap-4 max-[585px]:grid-cols-1 max-[585px]:gap-2";

  return (
    <div>
      <h3 className="mb-[10px]">Billing Address</h3>
      <p className="font-light">
        The following addresses will be used on the checkout page by default.
      </p>
      <Form
        // onFinish={upadateAdressForm}
        onFinish={updaterCookie}
        layout="vertical"
        fields={[
          { name: ["name"], value: auth?.name },
          { name: ["surname"], value: auth?.surname },
          { name: ["country"], value: auth?.billing_address?.country },
          { name: ["town"], value: auth?.billing_address?.town },
          {
            name: ["street_address"],
            value: auth?.billing_address?.street_address,
          },
          {
            name: ["additional_street_address"],
            value: auth?.billing_address?.additional_street_address,
          },
          { name: ["state"], value: auth?.billing_address?.state },
          { name: ["zip"], value: auth?.billing_address?.zip },
          { name: ["email"], value: auth?.email },
          { name: ["phone_number"], value: auth?.phone_number },
        ]}
      >
        <div
          className={
            "grid grid-cols-2 gap-4 max-[585px]:grid-cols-1 max-[585px]:gap-2"
          }
        >
          <Form.Item
            name="name"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please enter First name",
              },
            ]}
          >
            <Input placeholder="Type your first name..." />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please enter Last name",
              },
            ]}
          >
            <Input placeholder="Type your last name..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="country"
            label="Country / Region"
            rules={[
              {
                required: true,
                message: "Please enter  country...",
              },
            ]}
          >
            <Input placeholder="Type your first name..." />
          </Form.Item>
          <Form.Item
            name="town"
            label="Town city"
            rules={[
              {
                required: true,
                message: "Please enter town city",
              },
            ]}
          >
            <Input placeholder="Type your town city..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="street_address"
            label="State adress"
            rules={[
              {
                required: true,
                message: "Please enter  Stret adress...",
              },
            ]}
          >
            <Input placeholder="Type your Street adress..." />
          </Form.Item>
          <Form.Item
            name="additional_street_address"
            label="Extra adress
            "
            rules={[
              {
                required: true,
                message: "Please enter Extra adress",
              },
            ]}
          >
            <Input
              placeholder="Type your Extra adress
..."
            />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: "Please enter  state...",
              },
            ]}
          >
            <Input placeholder="Type your state..." />
          </Form.Item>
          <Form.Item
            name="zip"
            label="Zip"
            rules={[
              {
                required: true,
                message: "Please enter zip",
              },
            ]}
          >
            <Input placeholder="Type your Extra zip..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="email"
            label="Email adress"
            rules={[
              {
                required: true,
                message: "Please enter  email...",
              },
            ]}
          >
            <Input placeholder="Type your email..." />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
            ]}
          >
            <Input
              addonBefore={"+998"}
              placeholder="Type your phone number..."
            />
          </Form.Item>
        </div>
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white mt-[40px] h-[40px] px-[10px]">
          Place Order
        </button>
      </Form>
    </div>
  );
};
export default Adress;
