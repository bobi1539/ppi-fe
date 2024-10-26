import { BE_STAFF } from "../constants/endpoint-be";
import { StaffRequest } from "../dto/request/staff-request";
import { PageResponse } from "../dto/response/page-response";
import { StaffResponse } from "../dto/response/staff-response";
import { StaffSearchDto } from "../dto/search/staff-search-dto";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const DIVISION_ID = "divisionId";

export const staffFindAllPagination = async (search: StaffSearchDto): Promise<PageResponse<StaffResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_STAFF, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const staffFindAll = async (search: StaffSearchDto): Promise<StaffResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_STAFF + "/all", search), headers);
  return await handleResponse(response);
};

export const staffFindById = async (id: number): Promise<StaffResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_STAFF + "/" + id, headers);
  return await handleResponse(response);
};

export const staffCreate = async (request: StaffRequest): Promise<StaffResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_STAFF, headers, request);
  return await handleResponse(response);
};

export const staffUpdate = async (id: number, request: StaffRequest): Promise<StaffResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_STAFF, headers, request);
  return await handleResponse(response);
};

export const staffDelete = async (id: number): Promise<StaffResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_STAFF, headers);
  return await handleResponse(response);
};

export const staffRestore = async (id: number): Promise<StaffResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_STAFF + "/restore", headers, null);
  return await handleResponse(response);
};

export const getUrlFindAll = (url: string, search: StaffSearchDto): string => {
  const urlWithParam = new URL(buildUrlFindAll(url, search));
  if (search.divisionId) {
    urlWithParam.searchParams.append(DIVISION_ID, search.divisionId.toString());
  }
  return urlWithParam.toString();
};
