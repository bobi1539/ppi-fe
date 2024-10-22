export interface NewsletterRequest {
  title: string;
  description: string;
  coverBase64: string | null;
  coverFileName: string | null;
  contentBase64: string | null;
  contentFileName: string | null;
}
