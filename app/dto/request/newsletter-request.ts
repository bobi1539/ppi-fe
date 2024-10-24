import { FileUploadRequest } from "./file-upload-request";

export interface NewsletterRequest {
  title: string;
  description: string;
  cover: FileUploadRequest;
  content: FileUploadRequest;
}
