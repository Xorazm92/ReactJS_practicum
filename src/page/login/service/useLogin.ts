import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: { login: string; hashed_password: string }) =>
            request.post("/api/auth/login", data).then((res) => res.data),
    });
};
