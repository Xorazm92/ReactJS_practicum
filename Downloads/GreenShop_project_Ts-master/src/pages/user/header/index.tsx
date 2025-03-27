import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { FunctionComponent } from "react";
import { UserType, UserTypeApi } from "../../../@types";
import { useQueryApi } from "../../../hooks/useQuery";
import {
  useFollowerUser,
  useUnFollowerUser,
} from "../../../hooks/useQuery/useQueryaction";
import { useAuthUser } from "react-auth-kit";

const HeaderUser: FunctionComponent = () => {
  const { id } = useParams();
  const AuthUser: UserType = useAuthUser()() ?? {};
  //   console.log(AuthUser);

  const { isLoading }: UserTypeApi = useQueryApi({
    url: `/user/by_id/${id}`,
    pathname: `/user/by_id/${id}`,
  });
  const { mutate } = useFollowerUser();
  const { mutate: Unfollow } = useUnFollowerUser();
  const queryClient = useQueryClient();

  const data: UserType = queryClient.getQueryData([`/user/by_id/${id}`]) ?? {};
    // console.log(data.followers?.length);

  const btn_style =
    "bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white py-[10px] px-[15px] max-sm:py-[5px] max-sm:px-[5px] max-sm:text-[14px]";
  return (
    <div className="!w-full">
      <div className="!w-full h-[570px] relative">
        <img
          className="w-full h-[450px] rounded-b-[12px] max-lg:h-[350px]"
          src="https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/mountain-lake-header.jpg?fit=1584%2C396&ssl=1"
          alt=""
        />
        <div className="w-full flex items-end justify-between absolute bottom-[20px] max-[1151px]:flex-col max-[1151px]:items-center gap-5">
          <div className="flex items-end gap-4 max-[1151px]:flex-col max-[1151px]:items-center ">
            <div className="w-[150px] h-[150px] border-[5px] border-[#46A358] rounded-full flex justify-center">
              {!isLoading ? (
                <img className="rounded-full" src={data?.profile_photo} />
              ) : (
                <Skeleton.Avatar
                  style={{ width: 140, height: 140 }}
                  active={true}
                />
              )}
            </div>

            <div>
              <h2 className="text-[28px] mb-2 font-bold">
                {isLoading ? (
                  <Skeleton.Input />
                ) : (
                  <p>
                    {data.name} {data.surname}
                  </p>
                )}
              </h2>
              {!isLoading ? (
                <p> Followers: {data.followers?.length}</p>
              ) : (
                <Skeleton.Input />
              )}
            </div>
          </div>
          <div className="flex gap-4 max-sm:flex-wrap">
            <>
              {isLoading ? (
                <>
                  <Skeleton.Input active={true} />
                  <Skeleton.Input active={true} />
                </>
              ) : (
                <>
                  <button className={`${btn_style}`}>
                    <SendOutlined />
                    Send Invitation
                  </button>
                  {String(AuthUser._id) === String(id) ? (
                    <button className={`${btn_style}`}>
                      <UserOutlined />
                      You
                    </button>
                  ) : AuthUser.followers?.includes(String(id)) ? (
                    <button
                      onClick={() => Unfollow(String(id))}
                      className={`${btn_style}`}
                    >
                      <MinusCircleOutlined />
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => mutate(String(id))}
                      className={`${btn_style}`}
                    >
                      <PlusCircleOutlined />
                      Follow
                    </button>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;
