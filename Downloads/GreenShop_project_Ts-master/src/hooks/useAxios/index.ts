import axios from "axios";

interface PropTypes {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: object;
  headers?: object;
  params?: object;
}
export const useAxios = () => {
  const response = (props: PropTypes) => {
    const { url, method = "GET", body, headers, params } = props;
    return axios({
      url: `${import.meta.env.VITE_BASE_URL}${url}`,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accsess-Control-Allow-Origin": true,
        ...headers,
      },
      params: {
        access_token: "64bebc1e2c6d3f056a8c85b7",
        ...params,
      },
    })
      .then((data) => data.data)
      .catch(() => {
        console.log("error");
      });
  };

  return response;
};
