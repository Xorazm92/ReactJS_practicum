import { useAuthUser, useSignIn } from "react-auth-kit";
import { useAxios } from "../../hooks/useAxios";
import { notificationApi } from "../notification";
import { UserType } from "../../@types";

interface LikeType {
  isLiked: boolean;
  data: {
    route_path: string;
    flower_id: string;
  };
}

const useHandler = () => {
  const axios = useAxios();
  const notify = notificationApi();
  let SignIn = useSignIn();
  const auth: UserType = useAuthUser()() ?? {};

  const updaterUserAuth = (sholdUser: object) => {
    SignIn({
      token: localStorage.getItem("token") as string,
      tokenType: "Bearer",
      expiresIn: 3600,
      authState: {
        ...auth,
        ...sholdUser,
      },
    });
  };
  const likeHundler = ({ isLiked, data }: LikeType) => {
    const like = async () => {
      SignIn({
        token: localStorage.getItem("token") as string,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: {
          ...auth,
          wishlist: [...(auth.wishlist ?? []), data],
        },
      });
      notify("Like");
      await axios({ url: "/user/create-wishlist", method: "POST", body: data });
    };
    const disLike = async () => {
      SignIn({
        token: localStorage.getItem("token") as string,
        tokenType: "Bearer",
        expiresIn: 3600,
        authState: {
          ...auth,
          wishlist: auth.wishlist?.filter(
            (value) => value.flower_id !== data.flower_id
          ),
        },
      });
      notify("Dislike");
      await axios({
        url: "/user/delete-wishlist",
        method: "DELETE",
        body: { _id: data.flower_id },
      });
    };

    if (isLiked) {
      return disLike;
    }
    return like;
  };
  const updateUser = async (data: object) => {
    try {
      updaterUserAuth(data);
      await axios({
        url: "/user/account-details",
        method: "POST",
        body: data,
      }).then(() => notify("edit"));
    } catch (error) {
      console.log(error);
    }
  };
  const updateAdress = async ({ data, e }: { data: object; e: object }) => {
    try {
      updaterUserAuth(data);
      await axios({
        url: "/user/address",
        method: "POST",
        body: e,
      }).then((m) => console.log(m));
    } catch (err) {
      console.log(err);
    }
  };
  const useFollowUserCashe = (_id: string) => {
    return updaterUserAuth({
      followers: [...(auth.followers ?? []), _id],
    });
  };

  const useUnFollowUserCashe = (_id: string) => {
    return updaterUserAuth({
      followers: auth.followers?.filter((value) => value !== _id),
    });
  };

  return {
    likeHundler,
    updateUser,
    updateAdress,
    useFollowUserCashe,
    useUnFollowUserCashe,
  };
};

export { useHandler };
