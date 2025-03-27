import { Form, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useReduxSelector } from "../../../hooks/useRedux";
import { useRef } from "react";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { useGetcupon } from "../../../hooks/useQuery/useQueryaction";
import { PriceFuction } from "../../../utils";

const CardTotal = () => {
  const navigete = useNavigate();

  const refcupon = useRef<HTMLInputElement>(null);

  const { shop } = useReduxSelector((state) => state.shopSlice);

  const { coupon, isLaoding } = useReduxSelector((state) => state.cuponSlice);

  const PriceAllProduct = shop.reduce((acc, product) => {
    const price = PriceFuction(Number(product.count), Number(product.price));
    return Number((acc + price).toFixed(2));
  }, 0);

  const { mutate } = useGetcupon();

  const getCupon = () => {
    const coupon_code: string = refcupon.current?.value as string;
    if (coupon_code?.trim() === "") {
      return notification.info({ message: "Coupon Not defiened" });
    }
    const newcupon = { coupon_code };
    mutate(newcupon);
  };

  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";
  const discount_price: Number = (PriceAllProduct * coupon) / 100;

 console.log(coupon)
  return (
    <div>
      <h3 className="pb-5 text-[#3D3D3D] border-b border-[#46A358] font-bold text-[17px]">
        Card Total
      </h3>
      <Form onFinish={getCupon} className="flex h-[40px] mt-[35px]">
        <input
          ref={refcupon}
          name="coupon"
          placeholder="AEMA_MEM Coupon in product"
          className="border w-4/5  border-[#46A358] pl-[15px] placeholder:font-light rounded-l-lg rounded-r-none outline-none text-[18px] text-black font-normal"
        />
        <button
          disabled={coupon ? true : false}
          className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-1/5 rounded-l-none "
        >
          {isLaoding ? (
            <LoadingOutlined />
          ) : coupon ? (
            <CheckOutlined />
          ) : (
            <span>Apply</span>
          )}
        </button>
      </Form>
      <div className="mt-[20px]">
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Subtotal</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">
            ${PriceAllProduct}
          </h2>
        </div>
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
          <h2 className="text-[#3D3D3D] text-[15px]">
            {discount_price.toFixed(2)}$
          </h2>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-[20px]">
          <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total:</h2>
          <div className="flex flex-col gap-4">
            <h1
              className={`text-[#46A358] text-[18px] font-bold ${
                coupon && "line-through"
              }`}
            >
              ${PriceAllProduct.toFixed(3)}
            </h1>
            {Boolean(coupon) && (
              <h1
                className={`text-[#46A358] text-[18px] font-bold
            `}
              >
                ${(+PriceAllProduct - +discount_price).toFixed(3)}
              </h1>
            )}
          </div>
        </div>
        <button
          onClick={() => navigete("/product-checkout")}
          className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full h-[40px] mt-[30px]"
        >
          Proceed To Checkout
        </button>
        <Link to={"/Home"} className="flex justify-center">
          <button className="mt-[14px] text-[#46A358] cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardTotal;
