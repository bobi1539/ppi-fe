import { BaseResponse } from "../dto/response/base-response";
import { PageResponse } from "../dto/response/page-response";
import { getSession } from "../login/helper";
import { showErrorDialog } from "../utils/sweet-alert";

export const createHeadersWithoutSession = async (): Promise<Headers> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  return new Headers(headers);
};

export const createHeaders = async (): Promise<Headers> => {
  const session = await getSession();
  const headersObj: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: session.loginData.jwt ? `Bearer ${session.loginData.jwt}` : "",
  };
  return new Headers(headersObj);
};

export const makeGetRequest = async (url: string, headers: Headers): Promise<Response> => {
  return fetch(url, {
    method: "GET",
    headers: headers,
  });
};

export const makePostRequest = async (url: string, headers: Headers, body: any): Promise<Response> => {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: createRequestBody(body),
  });
};

export const makePutRequest = async (id: number, url: string, headers: Headers, body: any): Promise<Response> => {
  return fetch(url + "/" + id, {
    method: "PUT",
    headers: headers,
    body: createRequestBody(body),
  });
};

export const makeDeleteRequest = async (id: number, url: string, headers: Headers): Promise<Response> => {
  return fetch(url + "/" + id, {
    method: "DELETE",
    headers: headers,
  });
};

export const handleResponse = async (response: Response): Promise<any> => {
  const result = await response.json();
  if (!response.ok) {
    showErrorDialog(result.message);
    throw new Error(`Error : ${result.message}`);
  }
  return result.data;
};

export const createRequestBody = (body: any): string => {
  return JSON.stringify(body);
};

export const buildPageResponse = async (result: any): Promise<PageResponse<any>> => {
  return {
    content: result.content,
    pageable: {
      pageNumber: result.pageable.pageNumber,
      pageSize: result.pageable.pageSize,
    },
    totalElements: result.totalElements,
    totalPages: result.totalPages,
    numberOfElements: result.numberOfElements,
  };
};

export const setBaseResponse = (response: BaseResponse, result: any): void => {
  response.createdAt = result.createdAt;
  response.updatedAt = result.updatedAt;
  response.createdBy = result.createdBy;
  response.updatedBy = result.updatedBy;
  response.createdByName = result.createdByName;
  response.updatedByName = result.updatedByName;
  response.deleted = result.deleted;
};
