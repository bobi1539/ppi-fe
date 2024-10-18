import { BE_DIVISION } from "../constants/endpoint-be";
import { DivisionRequest } from "../dto/request/division-request";
import { DivisionResponse } from "../dto/response/division-response";
import { PageResponse } from "../dto/response/page-response";
import { DivisionSearchDto } from "../dto/search/division-search-dto";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";

export const PERIOD_ID = "periodId";

export const divisionFindAllPagination = async (search: DivisionSearchDto): Promise<PageResponse<DivisionResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_DIVISION, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const divisionFindAll = async (search: DivisionSearchDto): Promise<DivisionResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_DIVISION + "/all", search), headers);
  return await handleResponse(response);
};

export const divisionFindById = async (id: number): Promise<DivisionResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_DIVISION + "/" + id, headers);
  return await handleResponse(response);
};

export const divisionCreate = async (request: DivisionRequest): Promise<DivisionResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_DIVISION, headers, request);
  return await handleResponse(response);
};

export const divisionUpdate = async (id: number, request: DivisionRequest): Promise<DivisionResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_DIVISION, headers, request);
  return await handleResponse(response);
};

export const divisionDelete = async (id: number): Promise<DivisionResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_DIVISION, headers);
  return await handleResponse(response);
};

export const divisionRestore = async (id: number): Promise<DivisionResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_DIVISION + "/restore", headers, null);
  return await handleResponse(response);
};

export const getUrlFindAll = (url: string, search: DivisionSearchDto): string => {
  const urlWithParam = new URL(buildUrlFindAll(url, search));
  if (search.periodId) {
    urlWithParam.searchParams.append(PERIOD_ID, search.periodId.toString());
  }
  return urlWithParam.toString();
};
