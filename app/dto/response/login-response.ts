import { UserRoleMenuResponse } from "./user-role-menu-response";

export interface LoginResponse {
  jwt: string;
  refreshToken: string;
}
