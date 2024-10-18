import { BaseResponse } from "./base-response";
export interface PeriodResponse extends BaseResponse {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: boolean;
}
