import { BE_WEB_EVENT } from "../constants/endpoint-be";
import { EventResponse } from "../dto/response/event-response";
import { PageResponse } from "../dto/response/page-response";
import { SearchDto } from "../dto/search/search-dto";
import { buildPageResponse, buildUrlFindAll, createHeadersWithoutSession, handleResponse, makeGetRequest } from "./helper";

export const webEventFindAllPagination = async (search: SearchDto): Promise<PageResponse<EventResponse>> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(buildUrlFindAll(BE_WEB_EVENT, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const webEventFindBySlug = async (slug: string): Promise<EventResponse> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(BE_WEB_EVENT + "/slug/" + slug, headers);
  return await handleResponse(response);
};
