import { SubMenuResponse } from "./sub-menu-response";

export interface MenuResponse {
  id: number;
  name: string;
  route: string;
  icon: string;
  sequence: number;
  subMenus: SubMenuResponse[];
}
