import { StaffResponse } from "./staff-response";

export interface StaffDivisionResponse {
  id: number;
  name: string;
  heads: StaffResponse[];
  teams: StaffResponse[];
}
