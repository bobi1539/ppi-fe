import { NewsletterRequest } from "@/app/dto/request/newsletter-request";
import { buildUpdateFileUploadRequest, getFileFormData } from "@/app/utils/helper";

export const TITLE: string = "title";
export const DESCRIPTION: string = "description";
export const COVER: string = "cover";
export const CONTENT: string = "content";

export const buildNewsletterRequest = async (formData: FormData, coverFileNameExisting?: string, contentFileNameExisting?: string): Promise<NewsletterRequest> => {
  const cover = await getFileFormData(formData, COVER);
  const content = await getFileFormData(formData, CONTENT);

  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    cover: cover ?? buildUpdateFileUploadRequest(coverFileNameExisting),
    content: content ?? buildUpdateFileUploadRequest(contentFileNameExisting),
  };
};
