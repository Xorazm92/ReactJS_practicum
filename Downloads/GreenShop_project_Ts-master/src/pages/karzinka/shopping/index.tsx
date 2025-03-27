import { useReduxSelector } from "../../../hooks/useRedux";
import { Card } from "../card";

const ShoppingComponent: React.FC = () => {
  const { shop } = useReduxSelector((state) => state.shopSlice);

  return (
    <div>
      <div className="flex item-center justify-between text-start border-b border-[#46A358] pb-3">
        <h2 className="text-[#3D3D3D] text-[16px] font-medium pb-[10px] w-[22%]">
          Products
        </h2>
        <h2 className="text-[#3D3D3D] text-[16px] font-medium pb-[10px] w-[8%]">
          Price
        </h2>
        <h2 className="text-[#3D3D3D] text-[16px] font-medium pb-[10px] w-[8%]">
          Quantity
        </h2>
        <h2 className="text-[#3D3D3D] text-[16px] font-medium pb-[10px] w-[40%]">
          Total
        </h2>
      </div>
      {shop.map((value) => (
        <Card key={value._id} {...value} />
      ))}
    </div>
  );
};

export default ShoppingComponent;
