import { FC } from "react";
import { CardType, UserType } from "../../../../@types";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import { getProductshop } from "../../../../redux/shop.slice";
import { notification } from "antd";
import { useHandler } from "../../../../generic/handler";
import { HeartFilled } from "@ant-design/icons";
import { useAuthUser } from "react-auth-kit";
import { SetAuthModal } from "../../../../redux/modal.slice";

const Card: FC<CardType> = (props) => {
  const dispacht = useReduxDispatch();
  const { likeHundler } = useHandler();
  const auth: UserType = useAuthUser()() ?? {};
  let FindLiked = auth.wishlist?.filter(
    (value) => value.flower_id === props._id
  )[0];

  const isLiked = Boolean(FindLiked);
  // console.log(isLiked);

  const navigate = useNavigate();
  const style_icons: string =
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center  cursor-pointer text-[20px]";
  return (
    <div>
      <div className="group h-[300px] bg-[#f5f5f5] flex justify-center items-center relative">
        <img src={props.main_image} alt="flower" className="w-[85%] h-[70%] " />
        <div className="hidden items-center absolute bottom-4 gap-5  group-hover:flex">
          <div
            onClick={() =>
              dispacht(
                getProductshop(props),
                notification.success({ message: "Add card to shop" })
              )
            }
            className={style_icons}
          >
            <CiShoppingCart className="text-[22px]" />
          </div>
          <div
            onClick={() => {
              if (auth.email && auth.password) {
                likeHundler({
                  isLiked,
                  data: { route_path: props.category, flower_id: props._id },
                })();
              }else {
                dispacht(SetAuthModal({open:true}))
              }
            }}
            className={style_icons}
          >
            {isLiked ? (
              <HeartFilled className="text-[22px] text-[red]" />
            ) : <CiHeart className="text-[22px]"/>}
          </div>
          <div
            onClick={() => navigate(`/search/${props.category}/${props._id}`)}
            className={style_icons}
          >
            <CiSearch className="text-[22px]" />
          </div>
        </div>
      </div>
      <h3 className="text-[#3D3D3D] text-[16px] font-[500] pt-[10px] pb-[2px]">
        {props.title}
      </h3>
      <div className="flex items-center gap-3">
        <h3 className="text-[#46A358] text-[18px] font-bold">
          {props.price} $
        </h3>
        <h3 className="font-[300] text-[#A5A5A5] line-through">
          {props.discount_price} $
        </h3>
      </div>
    </div>
  );
};
export default Card;
