import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryApi } from "../../../hooks/useQuery";
import { DataUserinfo, UserType, UserTypeApi } from "../../../@types";
import { Avatar, Spin, Tooltip } from "antd";
import {
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { SetAuthModal } from "../../../redux/modal.slice";
import { useReduxDispatch } from "../../../hooks/useRedux";
import {
  useFollowerUser,
  useUnFollowerUser,
} from "../../../hooks/useQuery/useQueryaction";
const User_comments_blog: FC = () => {
  const { id, user_id } = useParams();
  const IsAuth = useIsAuthenticated()();
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { data, isLoading, isError }: DataUserinfo = useQueryApi({
    pathname: `blog/${id}`,
    url: `/user/blog/${id}`,
  });
  const AuthUser: UserType = useAuthUser()() ?? {};

  const { mutate } = useFollowerUser();
  const { mutate: Unfollow } = useUnFollowerUser();
  const btn_style =
    "bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white py-[10px] px-[15px] max-sm:py-[5px] max-sm:px-[5px] max-sm:text-[14px]";

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  }: UserTypeApi = useQueryApi({
    pathname: "user",
    url: `/user/by_id/${user_id}`,
  });
  let loading = isLoadingUser || isErrorUser || isLoading || isError;

  return (
    <div className="m-auto">
      {loading ? (
        <Spin
          className="m-auto !w-full !py-5"
          tip="Loading"
          size="large"
        ></Spin>
      ) : (
        <section className="w-[70%] m-auto mt-[30px]">
          <div className="flex items-center justify-between">
            <div
              onClick={() =>
                !IsAuth
                  ? dispatch(SetAuthModal({ open: true }))
                  : navigate(`/user/${user_id}`)
              }
              className="flex cursor-pointer gap-5 items-center"
            >
              <Tooltip title={`${user?.surname} ${user?.name}`}>
                <Avatar
                  className="w-[50px]  h-[50px]"
                  src={user?.profile_photo}
                />
              </Tooltip>
              <div className="flex flex-col justify-start items-center gap-1">
                <h2 className="font-bold text-[18px]">
                  {user?.name} {user?.surname}
                </h2>
                <p className="text-[12px]">
                  Followers {user?.followers?.length}
                </p>
              </div>
            </div>
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
                Follow
              </button>
            )}
          </div>
          <div className="mt-7">
            <h2 className="py-[20px] font-bold text-[24px]">{data?.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: data?.content as string }}
            ></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1  cursor-pointer">
              <EyeOutlined /> <p>{data?.views}</p>
            </div>
            <div className="flex items-center gap-1  cursor-pointer">
              <HeartOutlined /> <p>0</p>
            </div>
            <div className="flex items-center gap-1  cursor-pointer">
              <MessageOutlined /> <p>0</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <ShareAltOutlined /> <p>0</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default User_comments_blog;
