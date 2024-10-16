import { MenuResponse } from "../dto/response/menu-response";

export const buildMenuResponse = async (result: any): Promise<MenuResponse> => {
  return {
    id: result.id,
    name: result.name,
    route: result.route,
    icon: result.icon,
    sequence: result.sequence,
    subMenus: result.subMenus,
  };
};
