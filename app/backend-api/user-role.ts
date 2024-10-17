import { SearchDto } from "./../dto/search/search-dto";
import { BE_USER_ROLE } from "../constants/endpoint-be";
import { UserRoleRequest } from "../dto/request/user-role-request";
import { PageResponse } from "../dto/response/page-response";
import { UserRoleResponse } from "../dto/response/user-role-response";
import { buildPageResponse, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { CONSTANT_IS_DELETED, CONSTANT_PAGE, CONSTANT_SEARCH, CONSTANT_SIZE } from "../constants/constant";

export const userRoleFindAllPagination = async (search: SearchDto): Promise<PageResponse<UserRoleResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_USER_ROLE, search), headers);
  const result = await handleResponse(response);
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

export const buildUrlFindAll = (url: string, search: SearchDto): string => {
  const urlWithParam = new URL(url);
  urlWithParam.searchParams.append(CONSTANT_SEARCH, search.search);
  if (search.isDeleted) {
    urlWithParam.searchParams.append(CONSTANT_IS_DELETED, search.isDeleted.toString());
  }
  if (search.page) {
    urlWithParam.searchParams.append(CONSTANT_PAGE, search.page.toString());
  }
  if (search.size) {
    urlWithParam.searchParams.append(CONSTANT_SIZE, search.size.toString());
  }
  return urlWithParam.toString();
};
