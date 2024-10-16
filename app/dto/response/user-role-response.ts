import { BaseResponse } from "./base-response";

export interface UserRoleResponse extends BaseResponse {
  id: number;
  name: string;
  userCount: number;
}
