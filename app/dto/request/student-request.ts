import { FileUploadRequest } from "./file-upload-request";

export interface StudentRequest {
  name: string;
  nickname: string;
  email: string;
  major: string;
  expectedGraduationYear: string;
  birthDate: string;
  genderId: number;
  educationId: number;
  photo: FileUploadRequest | null;
}
