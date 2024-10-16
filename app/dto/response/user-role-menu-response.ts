import { MenuResponse } from "./menu-response";

export interface UserRoleMenuResponse {
  userRoleId: number;
  name: string;
  menus: MenuResponse[];
}
