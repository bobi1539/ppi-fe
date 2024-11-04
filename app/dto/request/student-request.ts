import { FileUploadRequest } from "./file-upload-request";

export interface StudentRequest {
  name: string;
  email: string;
  photo: FileUploadRequest | null;
  major: string;
  education: string;
  graduation: string | null;
  birthDate: string | null;
  genderId: number;
}
