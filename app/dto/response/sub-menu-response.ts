import { BaseResponse } from "./base-response";

export interface SubMenuResponse extends BaseResponse {
  id: number;
  name: string;
  route: string;
  sequence: number;
  menuId: number;
}
