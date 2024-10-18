import { SessionOptions } from "iron-session";

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
