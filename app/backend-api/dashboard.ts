import { BE_DASHBOARD } from "../constants/endpoint-be";
import { DashboardResponse } from "../dto/response/dashboard-response";
import { createHeaders, handleResponse, makeGetRequest } from "./helper";

export const dashboardGet = async (year: string): Promise<DashboardResponse> => {
  const urlWithParam = new URL(BE_DASHBOARD);
  urlWithParam.searchParams.append("year", year);

  const headers = await createHeaders();
  const response = await makeGetRequest(urlWithParam.toString(), headers);
  return await handleResponse(response);
};
