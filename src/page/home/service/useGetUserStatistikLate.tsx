import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetUserStatistikLate = () => {
  return useQuery({
    queryKey: ["user_statistik_late"],
    queryFn: () =>
      request.get("/store-statistics/late-payments").then((res) => res.data),
  });
};
