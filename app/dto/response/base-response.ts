export interface BaseResponse {
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
  createdByName?: string;
  updatedByName?: string;
  isDeleted?: boolean;
}
