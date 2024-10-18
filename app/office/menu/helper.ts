import { MenuRequest } from "@/app/dto/request/menu-request";
import { MenuResponse } from "@/app/dto/response/menu-response";

export const MENU_NAME: string = "menu-name";
export const SEQUENCE: string = "sequence";

export const buildMenuRequest = (formData: FormData, menu: MenuResponse | undefined): MenuRequest => {
  return {
    name: String(formData.get(MENU_NAME)),
    sequence: Number(formData.get(SEQUENCE)),
    route: menu?.route ?? "",
    icon: menu?.icon ?? "",
  };
};
