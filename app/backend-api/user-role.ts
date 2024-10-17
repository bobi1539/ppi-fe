import { BE_USER_ROLE } from "../constants/endpoint-be";
import { UserRoleRequest } from "../dto/request/user-role-request";
import { PageResponse } from "../dto/response/page-response";
import { UserRoleResponse } from "../dto/response/user-role-response";
import { buildPageResponse, createHeaders, handleResponse, makeGetRequest, makePostRequest, setBaseResponse } from "./helper";

export const userRoleFindAllPagination = async (): Promise<PageResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER_ROLE, headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const userRoleCreate = async (request: UserRoleRequest): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_USER_ROLE, headers, request);
  const result = await handleResponse(response);
  return buildUserRoleResponse(result);
};

export const buildUserRoleResponse = async (result: any): Promise<UserRoleResponse> => {
  const response: UserRoleResponse = {
    id: result.id,
    name: result.name,
    userCount: result.userCount,
  };
  setBaseResponse(response, result);
  return response;
};
