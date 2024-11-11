import { SearchDto } from "./../dto/search/search-dto";
import { BE_NEWSLETTER, BE_WEB_NEWSLETTER } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, createHeadersWithoutSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { NewsletterResponse } from "../dto/response/newsletter-response";
import { NewsletterRequest } from "../dto/request/newsletter-request";
import { NewsletterSubscriptionRequest } from "../dto/request/newsletter-email-request";
import { NewsletterSubscriptionResponse } from "../dto/response/newsletter-email-response";

export const newsletterFindAllPagination = async (search: SearchDto): Promise<PageResponse<NewsletterResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_NEWSLETTER, search), headers);
  const result: PageResponse<NewsletterResponse> = await handleResponse(response);
  return buildPageResponse(result);
};

export const newsletterFindAll = async (search: SearchDto): Promise<NewsletterResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_NEWSLETTER + "/all", search), headers);
  return await handleResponse(response);
};

export const newsletterFindById = async (id: number): Promise<NewsletterResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_NEWSLETTER + "/" + id, headers);
  return await handleResponse(response);
};

export const newsletterFindBySlug = async (slug: string): Promise<NewsletterResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_NEWSLETTER + "/slug/" + slug, headers);
  return await handleResponse(response);
};

export const newsletterCreate = async (request: NewsletterRequest): Promise<NewsletterResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_NEWSLETTER, headers, request);
  return await handleResponse(response);
};

export const newsletterUpdate = async (id: number, request: NewsletterRequest): Promise<NewsletterResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_NEWSLETTER, headers, request);
  return await handleResponse(response);
};

export const newsletterDelete = async (id: number): Promise<NewsletterResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_NEWSLETTER, headers);
  return await handleResponse(response);
};

export const newsletterRestore = async (id: number): Promise<NewsletterResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_NEWSLETTER + "/restore", headers, null);
  return await handleResponse(response);
};

export const webNewsletterFindAllPagination = async (search: SearchDto): Promise<PageResponse<NewsletterResponse>> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(buildUrlFindAll(BE_WEB_NEWSLETTER, search), headers);
  const result: PageResponse<NewsletterResponse> = await handleResponse(response);
  return buildPageResponse(result);
};

export const webNewsletterFindBySlug = async (slug: string): Promise<NewsletterResponse> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(BE_WEB_NEWSLETTER + "/slug/" + slug, headers);
  return await handleResponse(response);
};

export const webNewsletterCountAll = async (): Promise<number> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(BE_WEB_NEWSLETTER + "/count", headers);
  return await handleResponse(response);
};

export const webNewsletterEmailCreate = async (request: NewsletterSubscriptionRequest): Promise<NewsletterSubscriptionResponse> => {
  const headers = await createHeadersWithoutSession();
  const response = await makePostRequest(BE_WEB_NEWSLETTER + "/subscribe", headers, request);
  return await handleResponse(response);
};
