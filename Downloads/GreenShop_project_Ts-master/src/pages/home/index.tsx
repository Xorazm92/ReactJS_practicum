import CaruselComponent from "../../components/carusel";

import Categories from "./categories";
import Flowers from "./Products";
import Blog_flowers from "./bloga_flowers";
import { useQueryApi } from "../../hooks/useQuery";
import { CardType, options } from "../../@types";
import { Select } from "antd";
import Card from "./categories/cards";
import useLoader from "../../generic/loader";
import { Searchparams } from "../../generic/useParams";
import { SortOptions, Title_category } from "../../utils";

const Home: React.FC = () => {
  const { Card_Loader } = useLoader();
  const { getParam, Setparam } = Searchparams();
  const Categorypath: string = getParam("category") || "house-plants";
  const type: string = getParam("type") || "all-plants";
  const sortPrice: string = getParam("sort") || "default-sorting";
  let range_min: number = Number(getParam("range_min")) || 0;
  let range_max: number = Number(getParam("range_max")) || 1000;
  const Setitle = (type: string) => {
    Setparam({
      category: Categorypath,
      type,
      sort: sortPrice,
      range_max,
      range_min,
    });
  };
  const {
    data,
    isLoading,
    isError,
  }: { data?: CardType[]; isLoading: boolean; isError: boolean } = useQueryApi({
    pathname: `products/${Categorypath}&type=${type}&sort=${sortPrice}&=range-min${range_min}&=range-max${range_max}`,
    url: `/flower/category/${Categorypath}`,
    params: {
      cateogry: Categorypath,
      type,
      sort: sortPrice,
      range_min,
      range_max,
    },
  });

  const SelectFuc = (e: string) => {
    Setparam({
      category: Categorypath,
      sort: e,
      type: type,
      range_min,
      range_max,
    });
  };

  return (
    <div>
      <CaruselComponent />
      <div className="flex justify-between gap-[30px]">
        <div className="my-5">
          <Categories />
        </div>
        <div>
          <div className="flex justify-between my-5 text-[15px] font-medium items-center gap-5">
            <div className="flex items-center cursor-pointer gap-4">
              {Title_category.map((value) => (
                <p
                  key={value.id}
                  className={`${
                    type === value.label && "text-[#46a358] border-b-4 "
                  }`}
                  onClick={() => Setitle(value.label)}
                >
                  {value.title}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <p>Sort by:</p>
              <Select
                defaultValue={sortPrice}
                onChange={SelectFuc}
                options={SortOptions.map((options: options) => ({
                  value: options.value,
                  label: options.label,
                }))}
              />
              {/* <Select
                onChange={SelectFuc}
                defaultValue="default-sorting"
                options={[
                  { value: "default-sorting", label: "Default Sorting" },
                  { value: "the-cheapest", label: "The Cheapest" },
                  { value: "most-expansive", label: "Most Expensive" },
                ]}       2-variant select uchun
                   /> */}
            </div>
          </div>
          <div>
            <div className="grid  grid-cols-3 w-full gap-[30px]">
              {isLoading || isError
                ? Card_Loader()
                : data?.map((value: CardType) => (
                    <Card key={value._id} {...value} />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Flowers />
      <Blog_flowers />
    </div>
  );
};

export default Home;
