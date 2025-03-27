import type { FC } from "react";
import { useReduxSelector } from "../../../../../hooks/useRedux";
import Card_chekout from "..";
import { PriceFuction } from "../../../../../utils";

const Total_chekout: FC = () => {
  const { coupon } = useReduxSelector((state) => state.cuponSlice);
  const { shop } = useReduxSelector((state) => state.shopSlice);

  const PriceAllProduct = shop.reduce((acc, product) => {
    const price = PriceFuction(Number(product.count), Number(product.price));
    return Number((acc + price).toFixed(2));
  }, 0);

  const coupon_value = Number(coupon);

  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";
  const discount_price = (PriceAllProduct * coupon_value) / 100;

  return (
    <section>
      <div>
        {shop.map((value) => (
          <Card_chekout key={value._id} {...value} />
        ))}
      </div>
      <div className="flex justify-between items-center pt-3">
        <h3 className={`${cupon_title_style}`}>Subtotal</h3>
        <h2 className="text-[#3D3D3D] text-[18px] font-medium">
          ${PriceAllProduct}
        </h2>
      </div>
      <div className="flex justify-between items-center pt-3">
        <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
        <h2 className="text-[#3D3D3D] text-[15px]">
          {Boolean(coupon) ? discount_price.toFixed(2) : 0}$
        </h2>
      </div>
      <div className="flex justify-between mt-[20px]">
        <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total:</h2>
        <div className="flex flex-col gap-4">
          <h1
            className={`text-[#46A358] text-[18px] font-bold ${
              coupon && "line-through"
            }`}
          >
            ${PriceAllProduct.toFixed(2)}
          </h1>
          {Boolean(coupon) && (
            <h1
              className={`text-[#46A358] text-[18px] font-bold
            `}
            >
              ${(PriceAllProduct - discount_price).toFixed(2)}
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Total_chekout;
