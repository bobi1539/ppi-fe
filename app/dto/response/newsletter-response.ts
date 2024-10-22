import { BaseResponse } from "./base-response";

export interface NewsletterResponse extends BaseResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover: string;
  content: string;
}
