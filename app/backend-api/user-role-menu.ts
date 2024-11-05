import { BE_USER_ROLE_MENU } from "../constants/endpoint-be";
import { UserRoleMenuRequest } from "../dto/request/user-role-menu-request";
import { UserRoleMenuResponse } from "../dto/response/user-role-menu-response";
import { createHeaders, handleResponse, makeGetRequest, makePostRequest } from "./helper";

export const userRoleMenuFindByHeader = async (): Promise<UserRoleMenuResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER_ROLE_MENU, headers);
  return await handleResponse(response);
};

export const userRoleMenuFindByUserRoleId = async (userRoleId: number): Promise<UserRoleMenuResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER_ROLE_MENU + "/" + userRoleId, headers);
  return await handleResponse(response);
};

export const userRoleMenuCreate = async (request: UserRoleMenuRequest): Promise<UserRoleMenuResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_USER_ROLE_MENU, headers, request);
  return await handleResponse(response);
};
