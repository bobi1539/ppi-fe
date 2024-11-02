import { BE_GALLERY, BE_WEB_GALLERY } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, buildUrlFindAll, createHeaders, createHeadersWithoutSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { GalleryResponse } from "../dto/response/gallery-response";
import { GallerySearchDto } from "../dto/search/gallery-search-dto";
import { GalleryRequest } from "../dto/request/gallery-request";

export const EVENT_ID = "eventId";

export const galleryFindAllPagination = async (search: GallerySearchDto): Promise<PageResponse<GalleryResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_GALLERY, search), headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};

export const galleryFindAll = async (search: GallerySearchDto): Promise<GalleryResponse[]> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(getUrlFindAll(BE_GALLERY + "/all", search), headers);
  return await handleResponse(response);
};

export const galleryFindById = async (id: number): Promise<GalleryResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_GALLERY + "/" + id, headers);
  return await handleResponse(response);
};

export const galleryCreate = async (request: GalleryRequest): Promise<GalleryResponse[]> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_GALLERY, headers, request);
  return await handleResponse(response);
};

export const galleryDelete = async (id: number): Promise<GalleryResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_GALLERY, headers);
  return await handleResponse(response);
};

export const galleryRestore = async (id: number): Promise<GalleryResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_GALLERY + "/restore", headers, null);
  return await handleResponse(response);
};

export const getUrlFindAll = (url: string, search: GallerySearchDto): string => {
  const urlWithParam = new URL(buildUrlFindAll(url, search));
  if (search.eventId) {
    urlWithParam.searchParams.append(EVENT_ID, search.eventId.toString());
  }
  return urlWithParam.toString();
};

export const webGalleryFindAll = async (search: GallerySearchDto): Promise<GalleryResponse[]> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(getUrlFindAll(BE_WEB_GALLERY + "/all", search), headers);
  return await handleResponse(response);
};
