import { BaseResponse } from "./base-response";
import { SystemParameterListResponse } from "./system-parameter-list-response";

export interface StudentResponse extends BaseResponse {
  id: number;
  name: string;
  email: string;
  photo: string;
  major: string;
  education: string;
  graduation: string;
  birthDate: string;
  gender: SystemParameterListResponse;
}
