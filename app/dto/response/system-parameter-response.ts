import { BaseResponse } from "./base-response";

export interface SystemParameterResponse extends BaseResponse {
  id: number;
  name: string;
  description: string;
}
