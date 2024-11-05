import { BE_DASHBOARD } from "../constants/endpoint-be";
import { DashboardResponse } from "../dto/response/dashboard-response";
import { createHeaders, handleResponse, makeGetRequest } from "./helper";

export const dashboardGet = async (): Promise<DashboardResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_DASHBOARD, headers);
  return await handleResponse(response);
};
