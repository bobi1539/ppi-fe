import { FileUploadRequest } from "./file-upload-request";

export interface StaffRequest {
  name: string;
  position: string;
  isHead: boolean;
  photo: FileUploadRequest | null;
  quote?: string;
  funFact?: string;
  description?: string;
  jobDescription?: string;
  divisionId: number;
}
