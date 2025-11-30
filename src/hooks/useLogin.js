import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: async ({ employeeId, password, role }) => {
      const result = await loginAPI({ employeeId, password, role });
      // result should have { accessToken, user }
      localStorage.setItem("accessToken", result.accessToken);
      return result;
    },
  });
}
