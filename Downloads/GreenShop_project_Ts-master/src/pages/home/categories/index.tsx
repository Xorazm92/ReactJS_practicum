import { Button,  Slider } from "antd";
import React, { useState } from "react";
import rasm from "../../../../images/super.png";
import { useQueryApi } from "../../../hooks/useQuery";
import { CategoryType } from "../../../@types";
import useLoader from "../../../generic/loader";
import Card_item from "./card_item";
import { Searchparams } from "../../../generic/useParams";
const Categories: React.FC = () => {
  const { getParam, Setparam } = Searchparams();

  let range_min: number = Number(getParam("range_min")) || 0;
  let range_max: number = Number(getParam("range_max")) || 1000;
  const Categorypath: string = getParam("category") || "house-plants";
  const type: string = getParam("type") || "all-plants";
  const sortPrice: string = getParam("sort") || "default-sorting";
  const [price, setprice] = useState<number[]>([range_min, range_max]);
  const { Category_loader } = useLoader();
  const {
    data,
    isLoading,
    isError,
  }: { isLoading: boolean; isError: boolean; data?: CategoryType[] } =
    useQueryApi({
      pathname: "categories",
      url: "/flower/category",
    });


  const setFilterParams = () => {
    Setparam({
      category: Categorypath,
      type,
      sort: sortPrice,
      range_max: price[1],
      range_min: price[0],
    });
  };

  return (
    <div className="bg-[#FBFBFB] p-2">
      <p className="text-[17px] font-bold">Categories</p>
      <div className="flex  w-[250px] mt-[30px] justify-between">
        <div className="flex-col text-[13px] font-bold gap-3 justify-start cursor-pointer flex">
          {isLoading || isError ? (
            <div className="mr-2 flex flex-col gap-3">{Category_loader()}</div>
          ) : (
            data?.map((value: CategoryType) => (
              <div key={value._id}>
                <Card_item key={value._id} {...value} />
              </div>
            ))
          )}
        </div>
        <div className="flex text-[13px] items-end font-bold flex-col gap-3">
          {isLoading || isError
            ? Category_loader()
            : data?.map((value: CategoryType) => (
                <div key={value._id}>
                  <p>({Math.abs(value.count)})</p>
                </div>
              ))}
        </div>
      </div>
      <div className="mt-4">
        <Slider
          onChange={(e) => setprice(e)}
          range
          max={1000}
          min={0}
          styles={{
            track: {
              background: "#46A358",
            },
          }}
        />
        <p>
          Price:
          <span className="text-[#46A358]">
            ${price[0]} - ${price[1]}
          </span>
        </p>
        <Button
          onClick={setFilterParams}
          className="bg-[#46A358] mt-4 text-[white] w-[90px]"
        >
          Filter
        </Button>
        <div className="flex flex-col gap-3 mt-3">
          <p className="text-[18px] font-bold">Size</p>
          <div className="flex gap-[160px]">
            <div className="text-[15px] flex flex-col gap-2 font-normal">
              <p>Small</p>
              <p>Medium </p>
              <p>Large </p>
            </div>
            <div className="text-[15px] flex flex-col gap-2 font-normal">
              <p>(119) </p>
              <p> (78)</p>
              <p>(86) </p>
            </div>
          </div>
        </div>
        <img
          src={rasm}
          className="mt-[30px] flex items-center  justify-center"
          alt="rasm"
        />
      </div>
    </div>
  );
};

export default Categories;
