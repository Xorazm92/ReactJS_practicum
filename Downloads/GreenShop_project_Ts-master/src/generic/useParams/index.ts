import { useSearchParams } from "react-router-dom";

const Searchparams = () => {
  const [params, Setparams] = useSearchParams();
  const getParam = (path: string) => params.get(path);
  const Setparam = (param: object) => {
    Setparams({
      ...param,
    });
  };
  return { getParam, Setparam };
};

export { Searchparams };
