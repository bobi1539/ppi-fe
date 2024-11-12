export interface LoginResponse {
  jwt: string;
  refreshToken: string;
  routes: string[];
}
