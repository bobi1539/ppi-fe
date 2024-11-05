import { BaseResponse } from "./base-response";
import { EventResponse } from "./event-response";
import { PeriodResponse } from "./period-response";

export interface SettingResponse extends BaseResponse {
  id: number;
  logo: string;
  banner: string;
  qrCode: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  supportAccountName: string;
  supportAccountNumber: string;
  supportShortCode: string;
  contactEmail: string;
  contactPhoneNumber: string;
  periodActive: PeriodResponse;
  eventGallery: EventResponse;
}
