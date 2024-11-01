import { SearchDto } from "./search-dto";

export interface StaffSearchDto extends SearchDto {
  periodId?: number;
  divisionId?: number;
  isHead?: boolean;
}
