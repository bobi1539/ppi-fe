import { BaseResponse } from "./base-response";
import { SystemParameterListResponse } from "./system-parameter-list-response";

export interface StudentResponse extends BaseResponse {
  id: number;
  name: string;
  nickname: string;
  email: string;
  photo: string;
  major: string;
  expectedGraduationYear: string;
  birthDate: string;
  gender: SystemParameterListResponse;
  education: SystemParameterListResponse;
}
