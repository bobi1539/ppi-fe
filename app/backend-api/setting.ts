import { BE_SETTING, BE_WEB_SETTING } from "../constants/endpoint-be";
import { SettingRequest } from "../dto/request/setting-request";
import { SettingResponse } from "../dto/response/setting-response";
import { createHeaders, createHeadersWithoutSession, handleResponse, makeGetRequest, makePutRequest } from "./helper";

export const settingFindById = async (id: number): Promise<SettingResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_SETTING + "/" + id, headers);
  return await handleResponse(response);
};

export const settingUpdate = async (id: number, request: SettingRequest): Promise<SettingResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_SETTING, headers, request);
  return await handleResponse(response);
};

export const webSettingFindById = async (id: number): Promise<SettingResponse> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(BE_WEB_SETTING + "/" + id, headers);
  return await handleResponse(response);
};
