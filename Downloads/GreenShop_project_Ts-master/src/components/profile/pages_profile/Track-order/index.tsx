import type { FC } from "react";
import { useQueryApi } from "../../../../hooks/useQuery";
import type { OrderType } from "../../../../@types";
import OrderItem from "./order-item";
import useLoader from "../../../../generic/loader";

const Order: FC = () => {
  const { Card_Order } = useLoader();
  const {
    data,
    isLoading,
    isError,
  }: { data?: OrderType[]; isLoading: boolean; isError: boolean } = useQueryApi(
    {
      url: "/order/get-order",
      pathname: "order",
    }
  );
  // console.log(data);
  const load = isLoading || isError;
  return (
    <div className="!w-full">
      {load ? (
        // <Empty description={'Order not defained'} />
        Card_Order()
      ) : (
        <>
          <h1 className="font-bold text-2xl">Track your Orders</h1>

          {data?.slice(37).map((value) => (
            <OrderItem key={value._id} {...value} />
          ))}
        </>
      )}
    </div>
  );
};

export default Order;
