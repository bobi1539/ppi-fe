import { BaseResponse } from "./base-response";
import { EventResponse } from "./event-response";

export interface GalleryResponse extends BaseResponse {
  id: number;
  fileName: string;
  event: EventResponse;
}
