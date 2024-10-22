export interface GalleryRequest {
  eventId: number;
  files: GalleryFileRequest[];
}

export interface GalleryFileRequest {
  fileBase64: string;
  fileName: string;
}
