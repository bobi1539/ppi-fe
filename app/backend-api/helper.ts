import { CONSTANT_IS_DELETED, CONSTANT_PAGE, CONSTANT_SEARCH, CONSTANT_SIZE, HTTP_CODE_UNAUTHORIZED } from "../constants/constant";
import { PageResponse } from "../dto/response/page-response";
import { SearchDto } from "../dto/search/search-dto";
import { getSessionForClient, logout, saveSessionLogin } from "../login/helper";
import { showErrorDialog } from "../utils/sweet-alert";
import { loginWithRefreshToken } from "./auth";
import { FE_LOGIN } from "../constants/endpoint-fe";
import { redirectTo } from "../utils/helper";

export const createHeadersWithoutSession = async (): Promise<Headers> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  return new Headers(headers);
};

export const createHeaders = async (): Promise<Headers> => {
  const session = await getSessionForClient();
  const headersObj: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: session.loginData.jwt ? `Bearer ${session.loginData.jwt}` : "",
  };
  return new Headers(headersObj);
};

export const makeGetRequest = async (url: string, headers: Headers): Promise<Response> => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  if (response.status === HTTP_CODE_UNAUTHORIZED) {
    await handleTokenExpired();
    return makeGetRequest(url, await createHeaders());
  }
  return response;
};

export const makePostRequest = async (url: string, headers: Headers, body: any): Promise<Response> => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: createRequestBody(body),
  });
  if (response.status === HTTP_CODE_UNAUTHORIZED) {
    await handleTokenExpired();
    return makePostRequest(url, await createHeaders(), body);
  }
  return response;
};

export const makePutRequest = async (id: number, url: string, headers: Headers, body: any): Promise<Response> => {
  const response = await fetch(url + "/" + id, {
    method: "PUT",
    headers: headers,
    body: createRequestBody(body),
  });
  if (response.status === HTTP_CODE_UNAUTHORIZED) {
    await handleTokenExpired();
    return makePutRequest(id, url, await createHeaders(), body);
  }
  return response;
};

export const makePutRequestWithoutId = async (url: string, headers: Headers, body: any): Promise<Response> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: createRequestBody(body),
  });
  if (response.status === HTTP_CODE_UNAUTHORIZED) {
    await handleTokenExpired();
    return makePutRequestWithoutId(url, await createHeaders(), body);
  }
  return response;
};

export const makeDeleteRequest = async (id: number, url: string, headers: Headers): Promise<Response> => {
  const response = await fetch(url + "/" + id, {
    method: "DELETE",
    headers: headers,
  });
  if (response.status === HTTP_CODE_UNAUTHORIZED) {
    await handleTokenExpired();
    return makeDeleteRequest(id, url, await createHeaders());
  }
  return response;
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

export const buildUrlFindAll = (url: string, search: SearchDto): string => {
  const urlWithParam = new URL(url);
  urlWithParam.searchParams.append(CONSTANT_SEARCH, search.search);
  if (search.isDeleted !== undefined) {
    urlWithParam.searchParams.append(CONSTANT_IS_DELETED, search.isDeleted.toString());
  }
  if (search.page) {
    urlWithParam.searchParams.append(CONSTANT_PAGE, search.page.toString());
  }
  if (search.size) {
    urlWithParam.searchParams.append(CONSTANT_SIZE, search.size.toString());
  }
  return urlWithParam.toString();
};

export const handleTokenExpired = async (): Promise<void> => {
  try {
    const loginResponse = await loginWithRefreshToken();
    await saveSessionLogin(loginResponse);
  } catch (error) {
    console.error(error);
    await logout();
    await showErrorDialog("Your session is expired.");
    redirectTo(FE_LOGIN);
  }
};
