import { MenuRequest } from "@/app/dto/request/menu-request";
import { SubMenuRequest } from "@/app/dto/request/sub-menu-request";
import { MenuResponse } from "@/app/dto/response/menu-response";
import { SubMenuResponse } from "@/app/dto/response/sub-menu-response";

export const MENU_NAME: string = "menu-name";
export const SEQUENCE: string = "sequence";
export const SUB_MENU_NAME: string = "sub-menu-name";

export const buildMenuRequest = (formData: FormData, menu: MenuResponse | undefined): MenuRequest => {
  return {
    name: String(formData.get(MENU_NAME)),
    sequence: Number(formData.get(SEQUENCE)),
    route: menu?.route ?? "",
    icon: menu?.icon ?? "",
  };
};

export const buildSubMenuRequest = (formData: FormData, subMenu: SubMenuResponse | undefined): SubMenuRequest => {
  return {
    name: String(formData.get(SUB_MENU_NAME)),
    sequence: Number(formData.get(SEQUENCE)),
    route: subMenu?.route ?? "",
    menuId: subMenu?.menuId ?? 0,
  };
};
