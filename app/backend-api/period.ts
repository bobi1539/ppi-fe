import { BE_PERIOD } from "../constants/endpoint-be";
import { PeriodRequest } from "../dto/request/period-request";
import { PageResponse } from "../dto/response/page-response";
import { PeriodResponse } from "../dto/response/period-response";
import { SearchDto } from "../dto/search/search-dto";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const periodFindAllPagination = async (search: SearchDto): Promise<PageResponse<PeriodResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_PERIOD, search), headers);
  const result: PageResponse<PeriodResponse> = await handleResponse(response);
  return buildPageResponse(result);
};

export const periodFindAll = async (search: SearchDto): Promise<PeriodResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_PERIOD + "/all", search), headers);
  return await handleResponse(response);
};

export const periodFindById = async (id: number): Promise<PeriodResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_PERIOD + "/" + id, headers);
  return await handleResponse(response);
};

export const periodCreate = async (request: PeriodRequest): Promise<PeriodResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_PERIOD, headers, request);
  return await handleResponse(response);
};

export const periodUpdate = async (id: number, request: PeriodRequest): Promise<PeriodResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_PERIOD, headers, request);
  return await handleResponse(response);
};

export const periodDelete = async (id: number): Promise<PeriodResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_PERIOD, headers);
  return await handleResponse(response);
};

export const periodRestore = async (id: number): Promise<PeriodResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_PERIOD + "/restore", headers, null);
  return await handleResponse(response);
};
