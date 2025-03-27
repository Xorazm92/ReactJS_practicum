import { Modal } from "antd";
import type { FC } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { setOrderModal } from "../../../../../redux/modal.slice";
import { useNavigate } from "react-router-dom";
import Check_data from "../check_data";
import { PriceFuction } from "../../../../../utils";

const ModalOrder: FC = () => {
  const { OrderModal } = useReduxSelector((st) => st.modalslice);
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();
  const { shop } = useReduxSelector((st) => st.shopSlice);
  const onCancel = () => {
    dispatch(setOrderModal({ open: false }));
    navigate("/profile/wishlist");
  };

  // const total_price = shop.reduce((acc, value) => (acc += value.price), 16);
  // console.log(total_price);
   const PriceAllProduct = shop.reduce((acc, product) => {
      const price = PriceFuction(Number(product.count), Number(product.price));
      return Number((acc + price).toFixed(2));
    }, 16);

  return (
    <div>
      <Modal
        className="!w-[650px]"
        onCancel={onCancel}
        open={OrderModal.open}
        title={"Order Confirmation"}
        footer={false}
      >
        <div className="flex items-start justify-between mt-5">
          <div className="border-r pr-4">
            <p>Order Number</p>
            <h2 className="font-bold">{Date.now()}</h2>
          </div>
          <div className="border-r pr-4">
            <p>Date</p>
            <h2 className="font-bold">{String(new Date()).slice(0, 15)}</h2>
          </div>
          <div className="border-r pr-4">
            <p>Total</p>
            <h2 className="font-bold">$ {PriceAllProduct.toFixed(2)}</h2>
          </div>
          <div className="border-r pr-4">
            <p>Payment Method</p>
            <h2 className="font-bold">Cash on delivery</h2>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-xl border-b border-[#46A35880]">
            Order Details
          </h1>

          {shop.map((value) => (
            <Check_data key={value._id} {...value} />
          ))}
        </div>
        <div className="flex items-center justify-between py-4">
          <h2>Shipping</h2>
          <p className="font-bold text-[#46A358]">$ 16.00</p>
        </div>
        <div className="flex items-center justify-between  border-b border-[#46A35880]">
          <h2>Total</h2>
          <p className="font-bold text-[#46A358]">${PriceAllProduct.toFixed(2)}</p>
        </div>
        <p className="text-center pt-4">
          Your order is currently being processed. You will receive an order
          <br />
          confirmation email shortly with the expected delivery date for your
          <br />
          items.
        </p>
        <button
          onClick={() => navigate("/profile/Order")}
          className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white m-auto mt-[50px] w-[145px] h-[45px]"
        >
          Track your order
        </button>
      </Modal>
    </div>
  );
};

export default ModalOrder;
