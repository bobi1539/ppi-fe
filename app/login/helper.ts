"use server";

import { getIronSession } from "iron-session";
import { SessionData } from "../dto/session-data";
import { cookies } from "next/headers";
import { sessionOptions } from "../utils/helper";
import { LoginResponse } from "../dto/response/login-response";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  return session;
};

export const saveSessionLogin = async (loginData: LoginResponse): Promise<boolean> => {
  const session = await getSession();
  session.isLoggedIn = true;
  session.loginData = loginData;
  console.log(session);
  await session.save();
  return session.isLoggedIn;
};

export const logout = async (): Promise<void> => {
  const session = await getSession();
  session.destroy();
};
