import { FileUploadRequest } from "./file-upload-request";

export interface EventRequest {
  title: string;
  description: string;
  cover: FileUploadRequest;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
