import { Modal } from "antd";
import { CardType, OrderType } from "../../../../../@types";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { setOrderDetails } from "../../../../../redux/modal.slice";
import { setOrder } from "../../../../../redux/order-slice";
import Check_data from "../../../../../pages/navbar/product_checkout/Forms/check_data";
import { useDeleteOrderApi } from "../../../../../hooks/useQuery/useQueryaction";

const OrderItem = (data: OrderType) => {
  
  const { orderDetailVisiblty } = useReduxSelector((s) => s.modalslice);
  const { order } = useReduxSelector((state) => state.orderSlice);
  const dispatch = useReduxDispatch();
  const { mutate } = useDeleteOrderApi();
  console.log(mutate);


  return (
    <div>
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] justify-between mt-5 bg-[#FBFBFB] p-4">
        <div className="border-r pl-4">
          <p>Order Number</p>
          <h2 className="font-bold">{data._id}</h2>
        </div>
        <div className="border-r pl-4">
          <p>Date</p>
          <h2 className="font-bold">{data.created_at.slice(0, 10)}</h2>
        </div>
        <div className="border-r pl-4">
          <p>Total</p>
          <h2 className="font-bold">{order?.extra_shop_info?.total?.toFixed(2)}</h2>
        </div>
        <div className="border-r pl-4">
          <p>More</p>
          <button
            onClick={() => {
              dispatch(setOrder(data));
              dispatch(setOrderDetails());
            }}
            className="text-[rgb(69,163,88)]"
          >
            More details
          </button>
        </div>
      </div>
      <Modal
        className="!w-[650px]"
        onOk={() => mutate({ _id: order?._id as string })}
        open={orderDetailVisiblty}
        onCancel={() => dispatch(setOrderDetails())}
        okType="danger"
        title="Order Confirmation"
        okText="delete"
      >
        <div className="flex items-start justify-between mt-5">
          <div className="border-r pr-4">
            <p>Order Number</p>
            <h2 className="font-bold">{order?._id}</h2>
          </div>
          <div className="border-r pr-4">
            <p>Date</p>
            <h2 className="font-bold">{order?.created_at.slice(0, 10)}</h2>
          </div>
          <div className="border-r pr-4">
            <p>Total</p>
            <h2 className="font-bold">
              $ {order?.extra_shop_info.total?.toFixed(2) ?? 0}
            </h2>
          </div>
          <div className="border-r pr-4">
            <p>Payment Method</p>
            <h2 className="font-bold">{order?.extra_shop_info.method}</h2>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="font-bold mb-5 pb-3 text-xl border-b border-[#00761880]">
            Order Details
          </h1>
          {order?.shop_list?.map((value: CardType) => (
            <Check_data key={value._id} {...value} />
          ))}
        </div>
        <div className="flex items-center justify-between py-4">
          <h2>Shipping</h2>
          <p className="font-bold text-[#46A358]">$ 16.00</p>
        </div>
        <div className="flex items-center justify-between  border-b border-[#46A35880]">
          <h2>Total</h2>
          <p className="font-bold text-[#46A358]">
            $ {order?.extra_shop_info.total?.toFixed(2) ?? 0}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default OrderItem;
