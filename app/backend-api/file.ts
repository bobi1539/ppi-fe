import { BE_FILE } from "../constants/endpoint-be";

export const fileDownload = (directory: string, fileName: string): string => {
  const url = new URL(BE_FILE + "/download");
  url.searchParams.append("directoryName", directory);
  url.searchParams.append("fileName", fileName);
  return url.toString();
};
