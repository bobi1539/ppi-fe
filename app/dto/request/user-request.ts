import { FileUploadRequest } from "./file-upload-request";

export interface UserRequest {
  username: string;
  name: string;
  email: string;
  isActive: boolean;
  photo: FileUploadRequest;
  description: string | null;
  userRoleId: number;
}
