import { SearchDto } from "./../dto/search/search-dto";
import { BE_USER_ROLE } from "../constants/endpoint-be";
import { UserRoleRequest } from "../dto/request/user-role-request";
import { PageResponse } from "../dto/response/page-response";
import { UserRoleResponse } from "../dto/response/user-role-response";
import { buildPageResponse, createHeaders, handleResponse, makeGetRequest, makePostRequest, setBaseResponse } from "./helper";
import { CONSTANT_IS_DELETED, CONSTANT_PAGE, CONSTANT_SEARCH, CONSTANT_SIZE } from "../constants/constant";

export const userRoleFindAllPagination = async (search: SearchDto): Promise<PageResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const userRoleCreate = async (request: UserRoleRequest): Promise<UserRoleResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_USER_ROLE, headers, request);
  const result = await handleResponse(response);
  return buildUserRoleResponse(result);
};

export const buildUrlFindAll = (search: SearchDto): string => {
  const url = new URL(BE_USER_ROLE);
  url.searchParams.append(CONSTANT_SEARCH, search.search);
  if (search.isDeleted) {
    url.searchParams.append(CONSTANT_IS_DELETED, search.isDeleted.toString());
  }
  if (search.page) {
    url.searchParams.append(CONSTANT_PAGE, search.page.toString());
  }
  if (search.size) {
    url.searchParams.append(CONSTANT_SIZE, search.size.toString());
  }
  return url.toString();
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
