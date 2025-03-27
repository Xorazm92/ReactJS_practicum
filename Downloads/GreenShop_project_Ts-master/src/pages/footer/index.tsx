import React from "react";
import logo from "../../../images/logo.svg";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephoneOutbound } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { Button } from "antd";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import paymal from "../../../images/paymal.png";
const Footer: React.FC = () => {
  return (
    <div className="mt-[2vh] ">
      <div className="flex text-[14px] font-normal px-4 py-[26px] bg-[#edf6ef] cursor-pointer justify-between items-center">
        <img src={logo} alt="" />
        <p className="flex items-center gap-3">
          <MdOutlineLocationOn />
          70 West Buckingham Ave. Farmingdale, NY 11735
        </p>
        <p className="flex items-center gap-3">
          <MdOutlineMailOutline />
          contact@greenshop.com
        </p>
        <p className="flex items-center gap-3">
          <BsTelephoneOutbound />
          +88 01911 717 490
        </p>
      </div>
      <footer className="flex bg-[#FBFBFB] py-3 px-3 justify-between items-start mt-[5vh]">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[19px] font-bold">My Account</h3>
          <p className="text-[14px] font-normal">My Account</p>
          <p className="text-[14px] font-normal">Our</p>
          <p className="text-[14px] font-normal">stores</p>
          <p className="text-[14px] font-normal">Contact us</p>
          <p className="text-[14px] font-normal">Career</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[19px] font-bold">Help & Guide</h3>
          <p className="text-[14px] font-normal">Help Center</p>
          <p className="text-[14px] font-normal">How to Buy</p>
          <p className="text-[14px] font-normal">Shipping & Delivery </p>
          <p className="text-[14px] font-normal"> Product Policy </p>
          <p className="text-[14px] font-normal"> How to Return</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[19px] font-bold">Categories</h3>
          <p className="text-[14px] font-normal"> House Plants</p>
          <p className="text-[14px] font-normal"> Potter Plants </p>
          <p className="text-[14px] font-normal"> Seeds </p>
          <p className="text-[14px] font-normal"> Small Plants </p>
          <p className="text-[14px] font-normal"> Accessories</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[19px] font-bold">Social Media</h3>
          <div className="flex items-center gap-4">
            <Button>
              <FaFacebookSquare />
            </Button>
            <Button>
              <FaInstagram />
            </Button>
            <Button>
              <FaTwitter />
            </Button>
            <Button>
              <FaLinkedin />
            </Button>
          </div>
          <h3 className="text-[19px] mb-3 font-bold">We accept</h3>

          <img className="cursor-pointer" src={paymal} alt="" />
        </div>
      </footer>
      <div className="w-full h-[1px] bg-[#e1e1e1]  mt-[14px]">
        <p className="text-center font-normal text-[14px] mt-3 ">
          © 2021 GreenShop. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
