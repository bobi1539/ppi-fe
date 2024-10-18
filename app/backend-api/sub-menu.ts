import { BE_SUB_MENU } from "../constants/endpoint-be";
import { createHeaders, handleResponse, makeGetRequest, makePutRequest } from "./helper";
import { SubMenuResponse } from "../dto/response/sub-menu-response";
import { SubMenuRequest } from "../dto/request/sub-menu-request";

export const subMenuFindById = async (id: number): Promise<SubMenuResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_SUB_MENU + "/" + id, headers);
  return await handleResponse(response);
};

export const subMenuUpdate = async (id: number, request: SubMenuRequest): Promise<SubMenuResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_SUB_MENU, headers, request);
  return await handleResponse(response);
};
