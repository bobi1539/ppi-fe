import { SubMenuResponse } from "../dto/response/sub-menu-response";

export const buildSubMenuResponse = async (result: any): Promise<SubMenuResponse> => {
  return {
    id: result.id,
    name: result.name,
    route: result.route,
    sequence: result.sequence,
  };
};
