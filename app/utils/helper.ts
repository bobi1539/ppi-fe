import { SessionOptions } from "iron-session";
import { FileDto } from "../dto/file-dto";

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

export const getFileFormData = async (formData: FormData, key: string): Promise<FileDto> => {
  const file = formData.get(key) as File;
  if (file && file.name !== "") {
    const base64 = await convertFileToBase64(file);
    return { fileName: file.name, base64 };
  }
  return { fileName: null, base64: null };
};
