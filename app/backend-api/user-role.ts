import { BE_USER_ROLE } from "../constants/endpoint-be";
import { PageResponse } from "../dto/response/page-response";
import { buildPageResponse, createHeaders, handleResponse, makeGetRequest } from "./helper";

export const userRoleFindAllPagination = async (): Promise<PageResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_USER_ROLE, headers);
  const result = await handleResponse(response);
  return buildPageResponse(result);
};
