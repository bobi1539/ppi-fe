import Swal from "sweetalert2";

export const createHeadersWithoutSession = async (): Promise<Headers> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  return new Headers(headers);
};

export const makeGetRequest = async (url: string, headers: Headers): Promise<Response> => {
  return fetch(url, {
    method: "GET",
    headers: headers,
  });
};

export const makePostRequest = async (url: string, headers: Headers, body: any): Promise<Response> => {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: createRequestBody(body),
  });
};

export const makePutRequest = async (id: number, url: string, headers: Headers, body: any): Promise<Response> => {
  return fetch(url + "/" + id, {
    method: "PUT",
    headers: headers,
    body: createRequestBody(body),
  });
};

export const makeDeleteRequest = async (id: number, url: string, headers: Headers): Promise<Response> => {
  return fetch(url + "/" + id, {
    method: "DELETE",
    headers: headers,
  });
};

export const handleResponse = async (response: Response): Promise<any> => {
  const result = await response.json();
  if (!response.ok) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: result.message,
    });
    throw new Error(`Error : ${result.message}`);
  }
  return result.data;
};

export const createRequestBody = (body: any): string => {
  return JSON.stringify(body);
};
