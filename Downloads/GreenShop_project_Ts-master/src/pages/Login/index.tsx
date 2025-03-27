import { Form, Input } from "antd";
import type { FieldType } from "../../@types";
import google from "../../../images/google.svg";
import face from "../../../images/facebook.svg";
import React from "react";
import { useLogin, useLoginGoogle } from "../../hooks/useQuery/useQueryaction";
import { SetAuthModal } from "../../redux/modal.slice";
import { useReduxDispatch } from "../../hooks/useRedux";
const Login: React.FC = () => {
  const { mutate: mutateGoogle } = useLoginGoogle();
  const { mutate } = useLogin();
  const dispatch = useReduxDispatch();

  const onFinish = (e: FieldType) => {
    mutate({ data: e });
    dispatch(SetAuthModal({ open: false,  }));
  };

  const SignInGoogle = () => mutateGoogle();
  const icon_style: string =
    "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer";
  return (
    <div className="mt-2">
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="almamun_uxui@outlook.com"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="border-[#eaeaea] h-[40px] hover:border-[#46A358] focus:border-[#46A358]"
            placeholder="***********"
          />
        </Form.Item>

        <p className="text-end text-[#46a358] text-[15px]">Forgot Password? </p>
        <button
          className="bg-[#46a358] w-full h-[40px] rounded-md text-white mt-5 text-[18px]"
          type="submit"
        >
          Login
        </button>
      </Form>
      <div className="flex items-center justify-center mt-5 mb-5 gap-4">
        <div className="w-[30%] h-[2px] bg-[#EAEAEA]"></div>
        <p className="w-[40%]text-[#3D3D3D] text-[13px]">Or login with</p>
        <div className="w-[30%] h-[2px] bg-[#EAEAEA]"></div>
      </div>
      <div onClick={SignInGoogle} className={icon_style}>
        <img src={google} alt="" />
        Login with Google
      </div>
      <div className={icon_style}>
        <img src={face} alt="" />
        Login with Facebook
      </div>
    </div>
  );
};

export default Login;
// abdullohsolikhov@gmail.com
//Apple701
