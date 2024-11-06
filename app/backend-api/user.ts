import { SearchDto } from "./../dto/search/search-dto";
import { BE_USER } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest, makePutRequestWithoutId } from "./helper";
import { UserResponse } from "../dto/response/user-response";
import { UserCreateRequest } from "../dto/request/user-create-request";
import { UserUpdateRequest } from "../dto/request/user-update-request";
import { ChangePasswordRequest } from "../dto/request/change-password-request";

const CHANGE_PASSWORD_URL: string = BE_USER + "/change-password";

export const userFindAllPagination = async (search: SearchDto): Promise<PageResponse<UserResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_USER, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const userFindByHeader = async (): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER + "/header", headers);
  return await handleResponse(response);
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

export const userChangePasswordById = async (id: number, request: ChangePasswordRequest): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, CHANGE_PASSWORD_URL, headers, request);
  return await handleResponse(response);
};

export const userChangePasswordByHeader = async (request: ChangePasswordRequest): Promise<UserResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequestWithoutId(`${CHANGE_PASSWORD_URL}/header`, headers, request);
  return await handleResponse(response);
};
