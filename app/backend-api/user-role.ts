import { SearchDto } from "./../dto/search/search-dto";
import { BE_USER_ROLE } from "../constants/endpoint-be";
import { UserRoleRequest } from "../dto/request/user-role-request";
import { PageResponse } from "../dto/response/page-response";
import { UserRoleResponse } from "../dto/response/user-role-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const userRoleFindAllPagination = async (search: SearchDto): Promise<PageResponse<UserRoleResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_USER_ROLE, search), headers);
  const result: PageResponse<UserRoleResponse> = await handleResponse(response);
  return buildPageResponse(result);
};

export const userRoleFindAll = async (search: SearchDto): Promise<UserRoleResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_USER_ROLE + "/all", search), headers);
  return await handleResponse(response);
};

export const userRoleFindById = async (id: number): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER_ROLE + "/" + id, headers);
  return await handleResponse(response);
};

export const userRoleCreate = async (request: UserRoleRequest): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_USER_ROLE, headers, request);
  return await handleResponse(response);
};

export const userRoleUpdate = async (id: number, request: UserRoleRequest): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_USER_ROLE, headers, request);
  return await handleResponse(response);
};

export const userRoleDelete = async (id: number): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_USER_ROLE, headers);
  return await handleResponse(response);
};

export const userRoleRestore = async (id: number): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_USER_ROLE + "/restore", headers, null);
  return await handleResponse(response);
};
