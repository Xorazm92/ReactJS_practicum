import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetUserStatistik = () => {
  return useQuery({
    queryKey: ["user_statistik"],
    queryFn: () =>
      request.get("/store-statistics/main").then((res) => res.data),
  });
};
