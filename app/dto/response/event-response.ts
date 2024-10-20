import { BaseResponse } from "./base-response";

export interface EventResponse extends BaseResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: string;
}
