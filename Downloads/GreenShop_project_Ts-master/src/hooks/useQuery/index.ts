import { useQuery } from "@tanstack/react-query";
import { useQueryTypes } from "../../@types";
import { useAxios } from "../useAxios";

const useQueryApi = ({ pathname, url, params }: useQueryTypes) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [pathname],
    queryFn: () => axios({ url, params }).then((data) => data.data),
  });
};

export { useQueryApi };
