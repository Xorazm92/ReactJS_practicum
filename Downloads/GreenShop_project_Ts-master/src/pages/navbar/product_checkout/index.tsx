import type { FC } from "react";
import BreadcrumbItem from "../../home/categories/brandcrumb";
import OrdersForms from "./Forms";
import Total_chekout from "./Total_card_chekout/card_chekout";

const Product_chekout: FC = () => {
  return (
    <section>
      <div>
        <BreadcrumbItem pathName="Chekout" />
      </div>
      <div className="grid mt-[30px] grid-cols-2 gap-8">
        <OrdersForms />
        <Total_chekout />
      </div>
    </section>
  );
};

export default Product_chekout;
