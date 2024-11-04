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

export const authLogout = async (): Promise<LoginResponse> => {
  const LOGOUT = BE_AUTH + "/logout";
  const headers = await createHeadersWithoutSession();
  const request = await getRefreshTokenRequest();
  const response = await makePostRequest(LOGOUT, headers, request);
  const result = await response.json();
  return buildLoginResponse(result.data);
};

export const loginWithRefreshToken = async (): Promise<LoginResponse> => {
  const REFRESH_TOKEN = BE_AUTH + "/refresh-token";
  const headers = await createHeadersWithoutSession();
  const request = await getRefreshTokenRequest();
  const response = await makePostRequest(REFRESH_TOKEN, headers, request);
  const result = await response.json();
  return buildLoginResponse(result.data);
};

const getRefreshTokenRequest = async (): Promise<RefreshTokenRequest> => {
  const session = await getSessionForClient();
  return {
    refreshToken: session.loginData.refreshToken,
  };
};

export const buildLoginResponse = async (result: any): Promise<LoginResponse> => {
  return {
    jwt: result.jwt,
    refreshToken: result.refreshToken,
  };
};
