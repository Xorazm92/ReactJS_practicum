import type { FC } from "react";
import { CardType } from "../../../@types";
import { LuTrash } from "react-icons/lu";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { decrement, deleteProduct, icrement } from "../../../redux/shop.slice";
import { message } from "antd";
import { PriceFuction } from "../../../utils";

const Card: FC<CardType> = ({ main_image, _id, count, title, price }) => {
  
  const disable = Number(count) <= 1 ? true : false;

  const dispatch = useReduxDispatch();
  return (
    <div className="flex items-center">
      <div className="mt-5 mb-4 p-4 bg-[#eee] flex justify-between w-[90%] gap-4 items-center">
        <div className="flex justify-between w-[100%]  items-center">
          <div className="flex items-center gap-1">
            <img src={main_image} className="w-[70px]" alt="" />
            <div>
              <p className="text-[16px] font-medium text-[#3d3d3d]">{title}</p>
              <p className="text-[14px] font-normal text-[#727272]">
                SKU:{_id}
              </p>
            </div>
          </div>
          <div className="text-[15px] font-medium text-[#727272]">${price}</div>
          <div className="flex items-center gap-3  w-[20%]">
            <button
              disabled={disable}
              onClick={() => dispatch(decrement(_id))}
              className="w-[25px] h-[25px] bg-[#46A358] rounded-full text-white"
            >
              -
            </button>
            <span className="text-[17px]">{count}</span>
            <button
              onClick={() => dispatch(icrement(_id))}
              className="w-[25px] h-[25px] bg-[#46A358] rounded-full text-white"
            >
              +
            </button>
          </div>
          <div className="text-[#46A358] text-[16px] font-bold   w-[20%]">
            ${PriceFuction((count), price)}
          </div>
          <div
            onClick={() =>
              dispatch(deleteProduct(_id), message.info("Product Removed"))
            }
          >
            <LuTrash className="text-[#727272] cursor-pointer text-[25px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
