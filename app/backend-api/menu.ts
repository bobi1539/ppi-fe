import { MenuResponse } from "../dto/response/menu-response";
import { SearchDto } from "./../dto/search/search-dto";
import { BE_MENU } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeGetRequest, makePutRequest } from "./helper";
import { MenuRequest } from "../dto/request/menu-request";

export const menuFindAllPagination = async (search: SearchDto): Promise<PageResponse<MenuResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_MENU, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const menuFindAll = async (search: SearchDto): Promise<MenuResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_MENU + "/all", search), headers);
  return await handleResponse(response);
};

export const menuFindById = async (id: number): Promise<MenuResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_MENU + "/" + id, headers);
  return await handleResponse(response);
};

export const menuUpdate = async (id: number, request: MenuRequest): Promise<MenuResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_MENU, headers, request);
  return await handleResponse(response);
};
