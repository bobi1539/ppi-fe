import { LoginResponse } from "./response/login-response";

export interface SessionData {
  isLoggedIn: boolean;
  loginData: LoginResponse;
}
