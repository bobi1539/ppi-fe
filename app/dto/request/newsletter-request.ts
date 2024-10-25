import { FileUploadRequest } from "./file-upload-request";

export interface NewsletterRequest {
  title: string;
  description: string;
  cover: FileUploadRequest | null;
  content: FileUploadRequest | null;
}
