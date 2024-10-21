"use server";

import { getIronSession, IronSession } from "iron-session";
import { SessionData } from "../dto/session-data";
import { cookies } from "next/headers";
import { sessionOptions } from "../utils/helper";
import { LoginResponse } from "../dto/response/login-response";

export const getSessionForClient = async (): Promise<SessionData> => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return {
    isLoggedIn: session.isLoggedIn,
    loginData: session.loginData,
  };
};

export const getSessionForServer = async (): Promise<IronSession<SessionData>> => {
  return await getIronSession<SessionData>(cookies(), sessionOptions);
};

export const saveSessionLogin = async (loginData: LoginResponse): Promise<boolean> => {
  const session = await getSessionForServer();
  session.isLoggedIn = true;
  session.loginData = loginData;
  await session.save();
  return session.isLoggedIn;
};

export const logout = async (): Promise<void> => {
  const session = await getSessionForServer();
  session.destroy();
};
