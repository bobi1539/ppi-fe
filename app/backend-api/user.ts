import { SearchDto } from "./../dto/search/search-dto";
import { BE_USER } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { UserResponse } from "../dto/response/user-response";
import { UserCreateRequest } from "../dto/request/user-create-request";
import { UserUpdateRequest } from "../dto/request/user-update-request";

export const userFindAllPagination = async (search: SearchDto): Promise<PageResponse<UserResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_USER, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const userFindById = async (id: number): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER + "/" + id, headers);
  return await handleResponse(response);
};

export const userCreate = async (request: UserCreateRequest): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_USER, headers, request);
  return await handleResponse(response);
};

export const userUpdate = async (id: number, request: UserUpdateRequest): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_USER, headers, request);
  return await handleResponse(response);
};

export const userDelete = async (id: number): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_USER, headers);
  return await handleResponse(response);
};

export const userRestore = async (id: number): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_USER + "/restore", headers, null);
  return await handleResponse(response);
};
