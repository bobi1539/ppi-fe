import { SessionOptions } from "iron-session";
import { FileUploadRequest } from "../dto/request/file-upload-request";

export const limitText = (text: string, limit: number, suffix: string = "(...)"): string => {
  if (text.length > limit) {
    return text.substring(0, limit) + suffix;
  }
  return text;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "ppi-warwick-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export const removeNonDigit = (e: React.ChangeEvent<HTMLInputElement>): number => {
  return Number(e.target.value.replace(/\D/g, ""));
};

export const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result?.toString().split(",")[1];
      if (result) {
        resolve(result);
      } else {
        reject(new Error("FileReader result is not a valid base64 string."));
      }
    };
    reader.onerror = () => {
      reject(new Error("FileReader error: " + reader.error?.message));
    };
  });
};

export const getFileFormData = async (formData: FormData, key: string): Promise<FileUploadRequest | null> => {
  const file = formData.get(key) as File;
  return fileToFileUploadRequest(file);
};

export const fileToFileUploadRequest = async (file: File): Promise<FileUploadRequest | null> => {
  if (file && file.name !== "") {
    const base64 = await convertFileToBase64(file);
    return { fileBase64: base64, fileName: file.name };
  }
  return null;
};

export const buildUpdateFileUploadRequest = (fileNameExisting?: string): FileUploadRequest | null => {
  return fileNameExisting
    ? {
        fileBase64: null,
        fileName: fileNameExisting,
      }
    : null;
};

export const redirectTo = (url: string): void => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};
