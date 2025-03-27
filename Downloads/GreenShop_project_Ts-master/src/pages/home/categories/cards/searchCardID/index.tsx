import { useParams } from "react-router-dom";
import { useQueryApi } from "../../../../../hooks/useQuery";
import { DataType } from "../../../../../@types";
import { Button, Image, Rate, Skeleton } from "antd";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import facebook from "../../../../../../images/S.svg";
import twitter from "../../../../../../images/M.svg";
import linkdin from "../../../../../../images/L.svg";
import messege from "../../../../../../images/XL.svg";
import AvatarUser from "./avatar";
const SearchComponent: React.FC = () =>{
  const [style, Setstyle] = useState<number>(-1);
  const [count, Setcount] = useState<number>(0);
  const [image, setimg] = useState<string>("");
  const [state, Setstate] = useState<boolean>(false);
  const decrement = () => {
    Setcount(count + 1);
  };
  const icrement = () => {
    Setcount(count >= 1 ? count - 1 : 0);
  };

  const toggleActive = (index: any) => {
    Setstyle(index);
  };

  const { id, category } = useParams<{ id: string; category: string }>();

  const { data, isLoading }: DataType = useQueryApi({
    pathname: "category",
    url: `/flower/category/${category}/${id}`,
  });
  console.log(data);

  return (
    <div>
      <div>
        <div className="w-90% px-8 my-6 flex justify-between">
          <div className="flex gap-[30px]">
            <div className="flex flex-col  gap-2 items-start">
              {isLoading ? (
                <div className="flex items-center justify-start gap-6">
                  <div className="flex-col mb-1 gap-5">
                    <Skeleton.Image />
                    <Skeleton.Image />
                    <Skeleton.Image />
                    <Skeleton.Image />
                  </div>
                  <Skeleton.Image className="!w-[400px] !h-[400px] " />
                </div>
              ) : (
                data?.detailed_images?.map((e: string, idx: number) => (
                  <div key={idx} onClick={() => setimg(e)}>
                    <img className="!w-[100px] !h-[100px]" src={e} />
                  </div>
                ))
              )}
            </div>
            <div>
              <Image
                className="!w-[400px] !h-[400px]"
                src={image ? image : data?.main_image}
                alt="ok"
              />
            </div>
          </div>
          <div className="flex gap-3 flex-col  w-[40%]">
            <h3 className="text-[28px] flex gap-3 font-bold">
              {isLoading ? (
                <Skeleton.Avatar className="!w-[60px] !h-[60px]" />
              ) : (
                <AvatarUser created_by={data?.created_by as string} />
              )}
              {data?.title}
            </h3>
            <h3 className="text-[22px] flex justify-between font-bold text-[#50a861]">
              ${data?.price}
              <span className="flex items-center gap-2">
                <Rate className="text-[15px]" value={data?.rate} />
                <span className="text-[14px] font-normal text-[black]">
                  <span>{data?.comments.length}</span> Customer Review
                </span>
              </span>
            </h3>

            <div className="text-[14px] font-normal">
              <span className="text-[15px] font-bold">Short Description: </span>

              {data?.short_description}
            </div>
            <div className="flex items-start mt-3 flex-col">
              <p className="text-[18px] flex font-bold">Size:</p>
              <div className="mt-3  flex items-start  gap-7 cursor-pointer justify-center  ">
                <span
                  onClick={() => toggleActive(0)}
                  className={`border-[2px] ${
                    style === 0
                      ? "text-[#46a358] font-extrabold border-[#46a358] text-[20px]"
                      : "text-[black]"
                  }  border-[solid] rounded-[100%] text-[18px] font-medium items-center flex justify-center w-[28px] h-[28px]`}
                >
                  <span>S</span>
                </span>
                <span
                  onClick={() => toggleActive(1)}
                  className={`border-[2px] ${
                    style === 1
                      ? "text-[#46a358] font-extrabold border-[#46a358] text-[20px]"
                      : "text-[black]"
                  }  border-[solid] rounded-[100%] text-[18px] font-medium items-center flex justify-center w-[28px] h-[28px]`}
                >
                  <span>M</span>
                </span>
                <span
                  onClick={() => toggleActive(2)}
                  className={`border-[2px] ${
                    style === 2
                      ? "text-[#46a358] font-extrabold border-[#46a358] text-[20px]"
                      : "text-[black]"
                  }  border-[solid] rounded-[100%] text-[18px] font-medium items-center flex justify-center w-[28px] h-[28px]`}
                >
                  <span>L</span>
                </span>
                <span
                  onClick={() => toggleActive(3)}
                  className={`border-[2px] ${
                    style === 3
                      ? "text-[#46a358] font-extrabold border-[#46a358] text-[16px]"
                      : "text-[black]"
                  }  border-[solid] rounded-[100%] text-[18px] font-medium items-center flex justify-center w-[28px] h-[28px]`}
                >
                  <p>XL</p>
                </span>
              </div>
              <div className="flex items-center gap-4 mt-[30px]">
                <Button
                  onClick={() => decrement()}
                  className="rounded-[100%] h-[40px]  bg-[#46a358] text-[white] text-[12px]"
                >
                  +
                </Button>
                <span className="text-[20px] font-normal">{count}</span>
                <Button
                  onClick={() => icrement()}
                  className="rounded-[100%] h-[40px]  bg-[#46a358] text-[white] text-[12px]"
                >
                  -
                </Button>
                <Button
                  type="primary"
                  color="primary"
                  className="bg-[#46a358] w-[130px] h-[40px] text-[14px] font-bold text-white"
                >
                  Buy NOW
                </Button>
                <Button className="border-[#46a358] w-[130px] h-[40px] text-[14px] font-bold text-[#46a358]">
                  Add to cart
                </Button>
                <Button className="border-[#46a358]  h-[40px] text-[14px] font-bold text-[#46a358]">
                  <CiHeart className="text-[30px]" />
                </Button>
              </div>
              <div className="mt-4 text-[15px] font-normal text-[#a5a5a5]">
                <p>
                  SKU: <span className="text-[#727272]">1995751877966</span>
                </p>
                <p>
                  Categories:
                  <span className="text-[#727272]">{data?.category}</span>
                </p>
                <p>
                  Tags:
                  <span className="text-[#727272]">Home, Garden, Plants</span>
                </p>
                <div className="flex  items-center gap-4">
                  <p>Share this products:</p>
                  <img className="cursor-pointer" src={facebook} alt="face" />
                  <img className="cursor-pointer" src={twitter} alt="twitter" />
                  <img className="cursor-pointer" src={linkdin} alt="linkdin" />
                  <img className="cursor-pointer" src={messege} alt="messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[50px]">
        <div className="flex items-center gap-5 font-medium mb-4 cursor-pointer text-[17px]">
          <h3
            className={`${
              !state
                ? "text-[#46a358] border-b-[2px] border-[#46a358] text-[17px] font-bold"
                : "text-black "
            } `}
            onClick={() => Setstate(false)}
          >
            Product Description
          </h3>
          <h3
            className={`${
              state
                ? "text-[#46a358] border-b-2 border-[#46a358] text-[17px] font-bold"
                : "text-black"
            } `}
            onClick={() => Setstate(true)}
          >
            Reviews
          </h3>
        </div>
      </div>
      <div className="mt-6">
        {!state ? (
          <div
            dangerouslySetInnerHTML={{ __html: data?.description as string }}
          ></div>
        ) : (
          <p>{data?.views}</p>
        )}
      </div>
    </div>
  );
};

export { SearchComponent };
