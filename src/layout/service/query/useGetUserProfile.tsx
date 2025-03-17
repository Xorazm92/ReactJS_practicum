import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user_profile"],
    queryFn: () => request.get("/profile").then((res) => res.data),
  });
};
