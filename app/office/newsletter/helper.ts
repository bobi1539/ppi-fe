import { NewsletterRequest } from "@/app/dto/request/newsletter-request";
import { getFileFormData } from "@/app/utils/helper";

export const TITLE: string = "title";
export const DESCRIPTION: string = "description";
export const COVER: string = "cover";
export const CONTENT: string = "content";

export const buildCreateNewsletterRequest = async (formData: FormData): Promise<NewsletterRequest> => {
  const fileCover = await getFileFormData(formData, COVER);
  const fileContent = await getFileFormData(formData, CONTENT);
  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    coverBase64: fileCover.base64,
    coverFileName: fileCover.fileName,
    contentBase64: fileContent.base64,
    contentFileName: fileContent.fileName,
  };
};

export const buildUpdateNewsletterRequest = async (formData: FormData, coverFileNameExisting: string, contentFileNameExisting: string): Promise<NewsletterRequest> => {
  const fileCover = await getFileFormData(formData, COVER);
  const fileContent = await getFileFormData(formData, CONTENT);

  if (fileCover.fileName === null) {
    fileCover.base64 = "string";
    fileCover.fileName = coverFileNameExisting;
  }

  if (fileContent.fileName === null) {
    fileContent.base64 = "string";
    fileContent.fileName = contentFileNameExisting;
  }

  return {
    title: String(formData.get(TITLE)),
    description: String(formData.get(DESCRIPTION)),
    coverBase64: fileCover.base64,
    coverFileName: fileCover.fileName,
    contentBase64: fileContent.base64,
    contentFileName: fileContent.fileName,
  };
};
