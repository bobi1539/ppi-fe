import { BE_WEB_NEWSLETTER } from "../constants/endpoint-be";
import { NewsletterResponse } from "../dto/response/newsletter-response";
import { PageResponse } from "../dto/response/page-response";
import { SearchDto } from "../dto/search/search-dto";
import { buildPageResponse, buildUrlFindAll, createHeadersWithoutSession, handleResponse, makeGetRequest } from "./helper";

export const webNewsletterFindAllPagination = async (search: SearchDto): Promise<PageResponse<NewsletterResponse>> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(buildUrlFindAll(BE_WEB_NEWSLETTER, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const webNewsletterFindBySlug = async (slug: string): Promise<NewsletterResponse> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(BE_WEB_NEWSLETTER + "/slug/" + slug, headers);
  return await handleResponse(response);
};
