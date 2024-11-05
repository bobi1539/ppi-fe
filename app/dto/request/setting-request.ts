import { FileUploadRequest } from "./file-upload-request";

export interface SettingRequest {
  logo: FileUploadRequest | null;
  banner: FileUploadRequest | null;
  qrCode: FileUploadRequest | null;
  instagram: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  supportAccountName: string;
  supportAccountNumber: string;
  supportShortCode: string;
  contactEmail: string;
  contactPhoneNumber: string;
  periodActiveId: number;
  eventGalleryId: number;
}
