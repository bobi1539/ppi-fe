import { BE_STUDENT, BE_WEB_STUDENT } from "../constants/endpoint-be";
import { StudentRequest } from "../dto/request/student-request";
import { WebStudentRequest } from "../dto/request/web-student-request";
import { PageResponse } from "../dto/response/page-response";
import { StudentResponse } from "../dto/response/student-response";
import { SearchDto } from "../dto/search/search-dto";
import { buildPageResponse, buildUrlFindAll, createHeaders, createHeadersWithoutSession, handleResponse, makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from "./helper";
import { SecretKeyResponse } from "@/app/dto/response/secret-key-response";

export const studentFindAllPagination = async (search: SearchDto): Promise<PageResponse<StudentResponse>> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(buildUrlFindAll(BE_STUDENT, search), headers);
  const result: PageResponse<StudentResponse> = await handleResponse(response);
  return buildPageResponse(result);
};

export const studentFindById = async (id: number): Promise<StudentResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_STUDENT + "/" + id, headers);
  return await handleResponse(response);
};

export const studentCreate = async (request: StudentRequest): Promise<StudentResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_STUDENT, headers, request);
  return await handleResponse(response);
};

export const studentUpdate = async (id: number, request: StudentRequest): Promise<StudentResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_STUDENT, headers, request);
  return await handleResponse(response);
};

export const studentDelete = async (id: number): Promise<StudentResponse> => {
  const headers = await createHeaders();
  const response = await makeDeleteRequest(id, BE_STUDENT, headers);
  return await handleResponse(response);
};

export const studentRestore = async (id: number): Promise<StudentResponse> => {
  const headers = await createHeaders();
  const response = await makePutRequest(id, BE_STUDENT + "/restore", headers, null);
  return await handleResponse(response);
};

export const webStudentCountAll = async (): Promise<number> => {
  const headers = await createHeadersWithoutSession();
  const response = await makeGetRequest(BE_WEB_STUDENT + "/count", headers);
  return await handleResponse(response);
};

export const webStudentCreate = async (request: WebStudentRequest): Promise<StudentResponse> => {
  const headers = await createHeadersWithoutSession();
  const response = await makePostRequest(BE_WEB_STUDENT, headers, request);
  return await handleResponse(response);
};

export const getStudentFormKey = async (): Promise<SecretKeyResponse> => {
  const headers = await createHeaders();
  const response = await makeGetRequest(BE_STUDENT + "/student-form-key", headers);
  return await handleResponse(response);
};

export const generateStudentFormKey = async (): Promise<SecretKeyResponse> => {
  const headers = await createHeaders();
  const response = await makePostRequest(BE_STUDENT + "/student-form-key", headers, null);
  return await handleResponse(response);
};
