import { SearchDto } from "./search-dto";

export interface StaffSearchDto extends SearchDto {
  divisionId: number;
  isHead: boolean;
}
