import { apiClient } from "../../shared/api/client";

export function loginApi(credentials) {
  return apiClient("/auth/login", {
    method: "POST",
    body: credentials,
  });
}
