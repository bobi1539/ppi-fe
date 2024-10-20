import { SearchDto } from "./../dto/search/search-dto";
import { BE_EVENT } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { EventResponse } from "../dto/response/event-response";
import { EventRequest } from "../dto/request/event-request";

export const eventFindAllPagination = async (search: SearchDto): Promise<PageResponse<EventResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_EVENT, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const eventFindAll = async (search: SearchDto): Promise<EventResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_EVENT + "/all", search), headers);
  return await handleResponse(response);
};

export const eventFindById = async (id: number): Promise<EventResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_EVENT + "/" + id, headers);
  return await handleResponse(response);
};

export const eventFindBySlug = async (slug: string): Promise<EventResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_EVENT + "/slug/" + slug, headers);
  return await handleResponse(response);
};

export const eventCreate = async (request: EventRequest): Promise<EventResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_EVENT, headers, request);
  return await handleResponse(response);
};

export const eventUpdate = async (id: number, request: EventRequest): Promise<EventResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_EVENT, headers, request);
  return await handleResponse(response);
};

export const eventDelete = async (id: number): Promise<EventResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_EVENT, headers);
  return await handleResponse(response);
};

export const eventRestore = async (id: number): Promise<EventResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_EVENT + "/restore", headers, null);
  return await handleResponse(response);
};
