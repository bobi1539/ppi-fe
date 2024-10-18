import { BaseResponse } from "./base-response";
import { PeriodResponse } from "./period-response";

export interface DivisionResponse extends BaseResponse {
  id: number;
  name: string;
  period: PeriodResponse;
}
