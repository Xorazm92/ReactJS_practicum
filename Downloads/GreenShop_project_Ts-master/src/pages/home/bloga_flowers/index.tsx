import React from "react";
import blog1 from "../../../../images/blog1.png";
import blog2 from "../../../../images/blog2.png";
import blog3 from "../../../../images/blog3.png";
import blog4 from "../../../../images/blog4.png";
import kaktus2 from "../../../../images/kaktus2.png";
import kaktus1 from "../../../../images/kaktus1.png";

import { TiArrowRightOutline } from "react-icons/ti";
import { Button, Input } from "antd";
import { Form } from "react-router-dom";
const Blog_flowers: React.FunctionComponent = () => {
  return (
    <div className="mt-[5vh]">
      <div className="text-center">
        <p className="text-[30px] font-bold">Our Blog Posts</p>
        <p className="text-[14px] font-normal">
          We are an online plant shop offering a wide range of cheap and trendy
          plants.
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center gap-4">
        <div className="flex flex-col gap-2 items-start">
          <img src={blog1} alt="rasm1" />
          <p className="text-[14px] font-medium text-[#46a358]">
            September 12 I Read in 6 minutes
          </p>
          <p className="text-[20px] font-bold">
            Cactus & Succulent <br /> Care Tips
          </p>
          <p className="font-normal text-[14px] text-[grey] opacity-1">
            Cacti are succulents are easy care <br /> plants for any home or
            patio.{" "}
          </p>
          <p className="cursor-pointer read flex items-center gap-3">
            Read More <TiArrowRightOutline />
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <img src={blog2} alt="rasm1" />
          <p className="text-[14px] font-medium text-[#46a358]">
            September 12 I Read in 8 minutes
          </p>
          <p className="text-[20px] font-bold">
            Top 10 Succulents for <br /> Your Home
          </p>
          <p className="font-normal text-[14px] text-[grey] opacity-1">
            Cacti are succulents are easy care <br /> plants for any home or
            patio.
          </p>
          <p className="cursor-pointer read flex items-center gap-3">
            Read More <TiArrowRightOutline />
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <img src={blog3} alt="rasm1" />
          <p className="text-[14px] font-medium text-[#46a358]">
            September 12 I Read in 2 minutes
          </p>
          <p className="text-[20px] font-bold">
            Cacti & Succulent <br /> Care Tips
          </p>
          <p className="font-normal text-[14px] text-[grey] opacity-1">
            Cacti are succulents are easy care <br /> plants for any home or
            patio.
          </p>
          <p className="cursor-pointer read  flex items-center gap-3">
            Read More <TiArrowRightOutline />
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <img src={blog4} alt="rasm1" />
          <p className="text-[14px] font-medium text-[#46a358]">
            September 12 I Read in 21 minutes
          </p>
          <p className="text-[20px] font-bold">
            Best Houseplants <br /> Room by Room
          </p>
          <p className="font-normal text-[14px] text-[grey] opacity-1">
            Cacti are succulents are easy care <br /> plants for any home or
            patio.
          </p>
          <p className="cursor-pointer read  flex items-center gap-3">
            Read More <TiArrowRightOutline />
          </p>
        </div>
      </div>

      <div className="kaktus mt-[5vh] flex justify-between items-center">
        <div>
          <img
            src={kaktus1}
            alt="kak"
          />
          <p className="text-[17px] font-bold">Garden Care</p>
          <p className="text-[14px] font-normal text-[grey] opacity-1">
            We are an online plant shop <br /> offering a wide range of cheap{" "}
            <br /> and trendy plants.
          </p>
        </div>
        <div className="h-[160px] w-[1px] bg-[grey]"></div>
        <div>
          <img
            src={kaktus2}
            alt="kak"
          />
          <p className="text-[17px] font-bold">Plant Renovation</p>
          <p className="text-[14px] font-normal text-[grey] opacity-1">
            We are an online plant shop <br /> offering a wide range of cheap{" "}
            <br /> and trendy plants.
          </p>
        </div>
        <div className="h-[160px] w-[1px] bg-[grey]"></div>
        <div>
          <img src={kaktus2} alt="kak" />
          <p className="text-[17px] font-bold">Watering Graden</p>
          <p className="text-[14px] font-normal text-[grey] opacity-1">
            We are an online plant shop <br /> offering a wide range of cheap{" "}
            <br /> and trendy plants.
          </p>
        </div>
        <div className="w-[360px] flex flex-col gap-3">
          <p className="text-[18px] font-bold">
            Would you like to join newsletters?
          </p>
          <Form className="flex items-center">
            <Input placeholder="enter your email address..." />
            <Button className="bg-[#46a358] text-[white]">Join</Button>
          </Form>
          <p className="text-[14px] font-normal text-[grey] opacity-1">
            We usually post offers and challenges in newsletter. We’re your
            online houseplant destination. We offer a wide range to yours!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog_flowers;
