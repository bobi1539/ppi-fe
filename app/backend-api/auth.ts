import { BE_AUTH } from "../constants/endpoint-be";
import { LoginRequest } from "../dto/request/login-request";
import { RefreshTokenRequest } from "../dto/request/refresh-token-request";
import { LoginResponse } from "../dto/response/login-response";
import { getSessionForClient } from "../login/helper";
import { createHeadersWithoutSession, handleResponse, makePostRequest } from "./helper";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const LOGIN = BE_AUTH + "/login";
  const headers = await createHeadersWithoutSession();
  const response = await makePostRequest(LOGIN, headers, request);
  const result = await handleResponse(response);
  return buildLoginResponse(result);
};

export const loginWithRefreshToken = async (): Promise<LoginResponse> => {
  const REFRESH_TOKEN = BE_AUTH + "/refresh-token";
  const headers = await createHeadersWithoutSession();
  const session = await getSessionForClient();
  const refreshTokenRequest: RefreshTokenRequest = {
    refreshToken: session.loginData.refreshToken,
  };
  const response = await makePostRequest(REFRESH_TOKEN, headers, refreshTokenRequest);
  const result = await response.json();
  return buildLoginResponse(result.data);
};

export const buildLoginResponse = async (result: any): Promise<LoginResponse> => {
  return {
    jwt: result.jwt,
    refreshToken: result.refreshToken,
  };
};
