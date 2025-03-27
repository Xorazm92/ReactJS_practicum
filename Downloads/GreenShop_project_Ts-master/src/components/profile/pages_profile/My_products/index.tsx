import type { FC } from "react";
import { useQueryApi } from "../../../../hooks/useQuery";
import { CardType} from "../../../../@types";
import useLoader from "../../../../generic/loader";
import Card from "../../../../pages/home/categories/cards";

const My_products: FC = () => {
  const { Card_Loader } = useLoader();

  const {
    data,
    isLoading,
    isError,
  }: { data?: CardType[]; isLoading: boolean; isError: boolean } = useQueryApi({
    url: "/user/products",
    pathname: "my-products",
  });

  return (
    <div className="grid grid-cols-3 gap-9">
      {isError || isLoading ? (
        Card_Loader()
      ) : (
        data?.map((value: CardType) => (
          <div className=" flex ">
            <Card key={value._id} {...value} />
          </div>
        ))
      )}
    </div>
  );
};

export default My_products;
