import { BaseResponse } from "./base-response";
import { DivisionResponse } from "./division-response";

export interface StaffResponse extends BaseResponse {
  id: number;
  name: string;
  position: string;
  isHead: boolean;
  photo: string;
  quote: string;
  funFact: string;
  description: string;
  jobDescription: string;
  division: DivisionResponse;
}
