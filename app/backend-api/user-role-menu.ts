import { BE_USER_ROLE_MENU } from "../constants/endpoint-be";
import { UserRoleMenuResponse } from "../dto/response/user-role-menu-response";
import { createHeaders, handleResponse, makeGetRequest } from "./helper";

export const findByHeader = async (): Promise<UserRoleMenuResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER_ROLE_MENU, headers);
  const result = await handleResponse(response);
  return buildUserRoleMenuResponse(result);
};

export const buildUserRoleMenuResponse = async (result: any): Promise<UserRoleMenuResponse> => {
  return {
    userRoleId: result.userRoleId,
    name: result.name,
    menus: result.menus,
  };
};
