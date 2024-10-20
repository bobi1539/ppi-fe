import { BE_FILE } from "../constants/endpoint-be"
import { makeGetRequest } from "./helper"

export const fileDownload = async (directory: string, fileName: string): Promise<Blob> => {
  const response = await makeGetRequest(buildUrlDownload(directory, fileName), new Headers());
  return response.blob();
}

export const buildUrlDownload = (directory: string, fileName: string):string => {
  const url = new URL(BE_FILE + "/download");
  url.searchParams.append("directoryName", directory);
  url.searchParams.append("fileName", fileName);
  return url.toString();
}