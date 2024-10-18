import { BaseResponse } from "./base-response";
import { SubMenuResponse } from "./sub-menu-response";

export interface MenuResponse extends BaseResponse {
  id: number;
  name: string;
  route: string;
  icon: string;
  sequence: number;
  subMenus: SubMenuResponse[];
}
