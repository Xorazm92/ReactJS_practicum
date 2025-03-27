import type { FC } from "react";
import { CardType } from "../../../../../@types";

const Check_data: FC<CardType> = (props) => {
  return (
    <div className="bg-[#FBFBFB] h-[70px] w-full mt-[11px] grid grid-cols-[3fr_1fr_1fr] items-center">
      <div className=" flex items-center">
        <img className="w-[70px] h-[70px]" src={props.main_image} alt="" />
        <div>
          <h3>{props.title}</h3>
          <div className="font-light text-[14px]">
            <p>SKU:</p>
            <p>{props._id}</p>
          </div>
        </div>
      </div>
      <h3 className="text-[#727272]">(x{props.count})</h3>
      <h3>${props.price * Number(props.count)}</h3>
    </div>
  );
};

export default Check_data;
