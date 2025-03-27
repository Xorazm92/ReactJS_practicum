import type { FC } from "react";
// import { path_profile } from "../../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSignOut } from "react-auth-kit";
import { Modal } from "antd";

const DashboardProfile: FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const signOut = useSignOut();
  const logOut = () => {
    modal.confirm({
      title: "Do you want to logout?",
      icon: <ExclamationCircleOutlined />,
      content: "Please make sure, bacause this action cannot be undone!",
      okText: "I'm sure ",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        signOut();
        navigate("/Home");
      },
    });
  };
  const navigate = useNavigate();
  const activeStyle: string = "text-[#45A358] border-l-4 border-[#45A358]";
  const { pathname } = useLocation();

  return (
    <div className="bg-[#FBFBFB]  text-xl p-[15px] w-[300px] max-md:hidden">
      <h1 className="font-bold">My Account</h1>
      <div className="mt-[20px]">
        <div
          onClick={() => navigate("/profile/Order")}
          className={`flex item-center gap-3  hover:bg-white p-3 hover:text-[#45A358] cursor-pointer hover:border-l-4 border-[#45A358] ${
            pathname === "/profile/Order" && activeStyle
          }`}
        >
          <div className="font-normal flex items-center gap-4 text-base">
            <DashboardOutlined /> Order
          </div>
        </div>
        <div>
          <div
            onClick={() => navigate("/profile/Address")}
            className={`flex item-center gap-3  hover:bg-white p-3 hover:text-[#45A358] cursor-pointer hover:border-l-4 border-[#45A358] ${
              pathname === "/profile/Address" && activeStyle
            }`}

            //   pathname.slice(9) === path && activeStyle
          >
            <div className="font-normal flex items-center gap-4 text-base">
              <EnvironmentOutlined /> Address
            </div>
          </div>
          <div>
            <div
              onClick={() => navigate("/profile/Wishlist")}
              className={`flex item-center gap-3 ${
                pathname === "/profile/Wishlist" && activeStyle
              }  hover:bg-white p-3 hover:text-[#45A358] cursor-pointer hover:border-l-4 border-[#45A358]`}

              //   pathname.slice(9) === path && activeStyle
            >
              <div className="font-normal flex items-center gap-4 text-base">
                <HeartOutlined /> Wishlist
              </div>
            </div>
            <div>
              <div
                onClick={() => navigate("/profile/Details")}
                className={`flex item-center gap-3 ${
                  pathname === "/profile/Details" && activeStyle
                }  hover:bg-white p-3 hover:text-[#45A358] cursor-pointer hover:border-l-4 border-[#45A358]`}

                //   pathname.slice(9) === path && activeStyle
              >
                <div className="font-normal flex items-center gap-4 text-base">
                  <UserOutlined /> Details
                </div>
              </div>
              <div
                onClick={() => navigate("/profile/My_product")}
                className={`flex item-center gap-3 ${
                  pathname === "/profile/My_product" && activeStyle
                }  hover:bg-white p-3 hover:text-[#45A358] cursor-pointer hover:border-l-4 border-[#45A358]`}

                //   pathname.slice(9) === path && activeStyle
              >
                <div className="font-normal flex items-center gap-4 text-base">
                  <ShoppingOutlined /> My products
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-solid pb-3 "></div>
      <button
        onClick={logOut}
        className="flex items-center gap-3 cursor-pointer pl-[5px] w-full h-[40px] mt-[20px] text-base text-red-600"
      >
        <LogoutOutlined />
        Log out
      </button>
      {contextHolder}
    </div>
  );
};

export default DashboardProfile;
