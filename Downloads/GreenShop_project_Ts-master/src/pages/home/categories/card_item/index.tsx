import  React from "react";
import { Searchparams } from "../../../../generic/useParams";
import { CategoryType } from "../../../../@types";

const Card_item: React.FC<CategoryType> = (props) => {
  const { getParam, Setparam } = Searchparams();
  const typeParams: string = getParam("type") || "all-plants";
  const Setcategy = () => {
    Setparam({ category: props.route_path, type: typeParams });
  };
  return (
    <div>
      <div
        onClick={Setcategy}
        className={`flex items-center justify-between  cursor-pointer ${
          getParam("category") === props.route_path &&
          "text-[#46A358]  font-semibold"
        }  hover:text-[#46A358] transition-all`}
      >
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default Card_item;
