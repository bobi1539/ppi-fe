import { BaseResponse } from "./base-response";
import { SystemParameterResponse } from "./system-parameter-response";

export interface SystemParameterListResponse extends BaseResponse {
  id: number;
  name: string;
  systemParameter: SystemParameterResponse;
}
