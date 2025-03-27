import logo from "../../../images/logo.svg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdLogIn } from "react-icons/io";
import { Badge, Modal, Popover } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { SetAuthModal } from "../../redux/modal.slice";
import { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { UserType } from "../../@types";
import Notification from "./notification";

const Navbar: React.FC = () => {
  const IsAuth = useIsAuthenticated()();
  const UserAuth: UserType = useAuthUser()() ?? {};

  // console.log(IsAuth);
  // console.log(UserAuth);

  const dispatch = useReduxDispatch();
  const { auth } = useReduxSelector((state) => state.modalslice);
  const { shop } = useReduxSelector((state) => state.shopSlice);
  const [login, SetLogin] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [time, SetTime] = useState<string>("");
  const navigate = useNavigate();
  setInterval(() => {
    const Time = new Date().toLocaleTimeString();
    SetTime(Time);
  }, 1);
  return (
    <header className="flex justify-between items-center p-4 relative">
      <img
        src={logo}
        onClick={() => navigate("/home")}
        className="cursor-pointer"
        alt="Logo"
      />

      <div className={"flex items-center gap-5"}>
        <a
          className={`text-[18px] cursor-pointer font-normal ${
            pathname !== "/Home"
              ? "text-[black]"
              : "text-[#46A358] border-b-2 border-[green]"
          }`}
          href="#"
          onClick={() => navigate("Home")}
        >
          Home
        </a>
        <a
          className={`text-[18px] cursor-pointer font-normal ${
            pathname !== "/Blog"
              ? "text-[black]"
              : "text-[#46A358] border-b-2 border-[green]"
          }`}
          href="#"
          onClick={() => navigate("Blog")}
        >
          Blog
        </a>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-[20px] font-medium">
          <span className="text-[#46a358]">{time}</span>
        </p>
        <Popover
          title={"Notifications"}
          content=<Notification/>
          trigger="click"
        >
          <IoIosNotificationsOutline className="text-[29px] cursor-pointer" />
        </Popover>
        <Badge onClick={() => navigate("karzinka")} count={shop.length}>
          <FiShoppingCart className="text-[24px] cursor-pointer" />
        </Badge>
        <button
          onClick={() => {
            !IsAuth
              ? dispatch(SetAuthModal({ open: true }), navigate("/Home"))
              : navigate("/profile/wishlist");
          }}
          className="w-[100px] h-[35px] flex items-center bg-[#46A358] text-white rounded-md justify-center gap-1"
        >
          {IsAuth ? (
            UserAuth.name
          ) : (
            <>
              <IoMdLogIn className="text-[22px]" /> login
            </>
          )}
        </button>
        <Modal
          footer={false}
          open={auth.open}
          onCancel={() => dispatch(SetAuthModal({ open: false }))}
        >
          <div className="flex justify-center items-center gap-5 mt-4">
            <h3
              onClick={() => SetLogin(true)}
              className={`font-medium cursor-pointer text-[20px] ${
                login ? "text-[#46A358]" : "text-[black]"
              }`}
            >
              Login
            </h3>
            <div className="w-[2px] h-[16px] bg-black"></div>
            <h3
              onClick={() => SetLogin(false)}
              className={`font-medium cursor-pointer text-[20px] ${
                !login ? "text-[#46A358]" : "text-[black]"
              }`}
            >
              Register
            </h3>
          </div>
          {login ? <Login /> : <Register />}
        </Modal>
      </div>
    </header>
  );
};

export default Navbar;
