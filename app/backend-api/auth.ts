import { BE_AUTH } from "../constants/endpoint-be";
import { LoginRequest } from "../dto/request/login-request";
import { LoginResponse } from "../dto/response/login-response";
import { createHeadersWithoutSession, handleResponse, makePostRequest } from "./helper";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const LOGIN = BE_AUTH + "/login";
  const headers = await createHeadersWithoutSession();
  const response = await makePostRequest(LOGIN, headers, request);
  const result = await handleResponse(response);
  return buildLoginResponse(result);
};

export const buildLoginResponse = async (result: any): Promise<LoginResponse> => {
  return {
    jwt: result.jwt,
    refreshToken: result.refreshToken,
  };
};
