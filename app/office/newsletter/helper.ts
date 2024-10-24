import { NewsletterRequest } from "@/app/dto/request/newsletter-request";
import { getFileFormData } from "@/app/utils/helper";

export const TITLE: string = "title";
export const DESCRIPTION: string = "description";
export const COVER: string = "cover";
export const CONTENT: string = "content";

export const buildCreateNewsletterRequest = async (formData: FormData): Promise<NewsletterRequest> => {
  const cover = await getFileFormData(formData, COVER);
  const content = await getFileFormData(formData, CONTENT);
  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    cover: cover,
    content: content,
  };
};

export const buildUpdateNewsletterRequest = async (formData: FormData, coverFileNameExisting: string, contentFileNameExisting: string): Promise<NewsletterRequest> => {
  const cover = await getFileFormData(formData, COVER);
  const content = await getFileFormData(formData, CONTENT);

  if (cover.fileName === null) {
    cover.fileBase64 = "string";
    cover.fileName = coverFileNameExisting;
  }

  if (content.fileName === null) {
    content.fileBase64 = "string";
    content.fileName = contentFileNameExisting;
  }

  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    cover: cover,
    content: content,
  };
};
