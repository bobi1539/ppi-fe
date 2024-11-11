import { BE_SYSTEM_PARAMETER_LIST } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { SystemParameterListResponse } from "../dto/response/system-parameter-list-response";
import { SystemParameterListSearchDto } from "../dto/search/system-parameter-list-search-dto";
import { SystemParameterListRequest } from "../dto/request/system-parameter-list-request";

export const SYSTEM_PARAMETER_ID = "systemParameterId";

export const systemParameterListFindAllPagination = async (search: SystemParameterListSearchDto): Promise<PageResponse<SystemParameterListResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_SYSTEM_PARAMETER_LIST, search), headers);
  const result: PageResponse<SystemParameterListResponse> = await handleResponse(response);
  return buildPageResponse(result);
};

export const systemParameterListFindAll = async (search: SystemParameterListSearchDto): Promise<SystemParameterListResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_SYSTEM_PARAMETER_LIST + "/all", search), headers);
  return await handleResponse(response);
};

export const systemParameterListFindById = async (id: number): Promise<SystemParameterListResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_SYSTEM_PARAMETER_LIST + "/" + id, headers);
  return await handleResponse(response);
};

export const systemParameterListCreate = async (request: SystemParameterListRequest): Promise<SystemParameterListResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_SYSTEM_PARAMETER_LIST, headers, request);
  return await handleResponse(response);
};

export const systemParameterListUpdate = async (id: number, request: SystemParameterListRequest): Promise<SystemParameterListResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_SYSTEM_PARAMETER_LIST, headers, request);
  return await handleResponse(response);
};

export const systemParameterListDelete = async (id: number): Promise<SystemParameterListResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_SYSTEM_PARAMETER_LIST, headers);
  return await handleResponse(response);
};

export const systemParameterListRestore = async (id: number): Promise<SystemParameterListResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_SYSTEM_PARAMETER_LIST + "/restore", headers, null);
  return await handleResponse(response);
};

export const getUrlFindAll = (url: string, search: SystemParameterListSearchDto): string => {
  const urlWithParam = new URL(buildUrlFindAll(url, search));
  if (search.systemParameterId) {
    urlWithParam.searchParams.append(SYSTEM_PARAMETER_ID, search.systemParameterId.toString());
  }
  return urlWithParam.toString();
};
