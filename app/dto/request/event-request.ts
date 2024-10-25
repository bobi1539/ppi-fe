import { FileUploadRequest } from "./file-upload-request";

export interface EventRequest {
  title: string;
  description: string;
  cover: FileUploadRequest | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
