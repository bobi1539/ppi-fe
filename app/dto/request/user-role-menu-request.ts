import { UserRoleSubMenuRequest } from "./user-role-sub-menu-request";

export interface UserRoleMenuRequest {
  userRoleId: number;
  menuIds: UserRoleSubMenuRequest[];
}
