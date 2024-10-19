import { UserRequest } from "./user-request";

export interface UserCreateRequest extends UserRequest {
  password: string;
  passwordConfirm: string;
}
