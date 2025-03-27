import { Button } from "antd";
import rasm3 from "../../../../images/rasm3.png";
import rasm5 from "../../../../images/rasm5.png";
import { TiArrowRightOutline } from "react-icons/ti";

const Flowers: React.FC = () => {
  return (
    <div className="flex  mt-14  gap-[30px] justify-between">
      <div className="flex  flower w-[50%] h-[250px] px-4 py-4  justify-evenly">
        <img src={rasm5} alt="rasm" />
        <div className="flex  flex-col gap-3 items-end text-end justify-end">
          <p className="text-[18px] font-extrabold">
            Summer cactus <br /> & succulents
          </p>
          <p className="text-[14px] font-normal">
            We are an online plant shop offering a wide range of cheap and
            trendy plants
          </p>
          <Button className="bg-[green] text-[white]">
            Find More <TiArrowRightOutline />
          </Button>
        </div>
      </div>
      <div className="flex flower w-[50%] h-[250px] px-4 py-4  justify-evenly">
        <img src={rasm3} alt="rasm" />
        <div className="flex  flex-col gap-3 items-end text-end justify-end">
          <p className="text-[18px] font-extrabold">
            Styling Trends <br /> & much more
          </p>
          <p className="text-[14px] font-normal">
            We are an online plant shop offering a wide range of cheap and
            trendy plants
          </p>
          <Button  className="bg-[green] text-[white]">
            Find More <TiArrowRightOutline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flowers;
