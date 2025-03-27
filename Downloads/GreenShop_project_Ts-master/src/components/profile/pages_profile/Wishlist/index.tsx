import type { FC } from "react";
import { useQueryApi } from "../../../../hooks/useQuery";
import useLoader from "../../../../generic/loader";
import Card from "../../../../pages/home/categories/cards";
import { CardType } from "../../../../@types";

const Wishlist: FC = () => {
  const { Card_Loader } = useLoader();
  const {
    data,
    isLoading,
    isError,
  }: { data?: CardType[]; isLoading: boolean; isError: boolean } = useQueryApi({
    pathname: "wishlist",
    url: "/user/wishlist",
  });
  console.log(data);

  return (
    <div className="grid grid-cols-3 gap-9 ">
      {isLoading || isError
        ? Card_Loader()
        : data?.map((value: CardType) => (
            <div key={value?._id} className="flex">
              <Card {...value} />
            </div>
          ))}
    </div>
  );
};

export default Wishlist;
