import React from "react";
import { Button } from "antd";
import BreadcrumbItem from "../home/categories/brandcrumb";
import CardTotal from "./card_total";
import ShoppingComponent from "./shopping";
import { useReduxSelector } from "../../hooks/useRedux";
import { useNavigate } from "react-router-dom";

const Karzinka: React.FC = () => {
  const { shop } = useReduxSelector((state) => state.shopSlice);
  const navigete = useNavigate();
  return (
    <div>
      <div className="mt-[30px]">
        <BreadcrumbItem pathName="Shopping page" />
      </div>
      <div>
        {shop.length !== 0 ? (
          <div className="grid grid-cols-[4fr_1.5fr] my-5">
            <ShoppingComponent />
            <CardTotal />
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center">
            <img
              className="w-[20%]"
              src="https://uzum.uz/static/img/shopocat.490a4a1.png"
              alt="mushuk"
            />
            <p className="font-medium text-[black] text-[15px]">
              Your cart is empty, please add a product
            </p>
            <Button type="primary" onClick={() => navigete("/Home")}>
              Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Karzinka;
