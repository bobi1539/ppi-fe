import { BaseResponse } from "./base-response";
import { SystemParameterListResponse } from "./system-parameter-list-response";
import { UserRoleResponse } from "./user-role-response";

export interface UserResponse extends BaseResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  emailVerifiedAt: string;
  isActive: boolean;
  photo: string;
  description: string;
  userRole: UserRoleResponse;
}
