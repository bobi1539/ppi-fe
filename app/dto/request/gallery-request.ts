import { FileUploadRequest } from "./file-upload-request";

export interface GalleryRequest {
  eventId: number;
  fileUploads: FileUploadRequest[];
}
