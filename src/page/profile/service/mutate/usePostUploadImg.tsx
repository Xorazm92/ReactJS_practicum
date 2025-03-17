import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const usePostUploadImg = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return request
        .post("/store/profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
