import { UserRoleMenuResponse } from "../dto/response/user-role-menu-response";

export const buildUserRoleMenuResponse = async (result: any): Promise<UserRoleMenuResponse> => {
  return {
    userRoleId: result.userRoleId,
    name: result.name,
    menus: result.menus,
  };
};
