"use client";

import { useEffect, useState } from "react";
import InputLabel from "../components/input-label";
import ButtonLoading from "../components/button-loading";
import { FE_DASHBOARD } from "../constants/endpoint-fe";
import { useRouter } from "next/navigation";
import { LoginRequest } from "../dto/request/login-request";
import { login } from "../backend-api/auth";
import { getSession, saveSessionLogin } from "./helper";
import ButtonIcon from "../components/button-icon";

export const USERNAME: string = "username";
export const PASSWORD: string = "password";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginRequest = buildLoginRequest(formData);

    try {
      const response = await login(loginRequest);
      const isLoginSession = await saveSessionLogin(response);
      setIsLogin(isLoginSession);
      router.push(FE_DASHBOARD);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildLoginRequest = (formData: FormData): LoginRequest => {
    return {
      username: formData.get(USERNAME) as string,
      password: formData.get(PASSWORD) as string,
    };
  };

  useEffect(() => {
    validateIsLogin();
  }, []);

  const validateIsLogin = async () => {
    const session = await getSession();
    setIsLogin(session.isLoggedIn);
    if (session.isLoggedIn) {
      router.push(FE_DASHBOARD);
    }
  };

  return (
    <>
      {!isLogin && (
        <section className="bg-[url('https://ppiwarwick.org/image/Kabi.png')] bg-gray-700 bg-no-repeat bg-cover bg-center bg-blend-multiply bg-opacity-60 min-h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 md:p-8">
                <div className="flex justify-center gap-3">
                  <img src="https://ppiwarwick.org/logo.png" className="h-9" alt="PPIW Logo" />
                  <span className="self-center text-secondary-700 text-xl font-semibold whitespace-nowrap">PPI Warwick</span>
                </div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl mb-6">Sign in to your account</h1>
                <form onSubmit={submitLogin} className="flex flex-col gap-4">
                  <InputLabel label="Username" name={USERNAME} type="text" isRequired={true} />
                  <InputLabel label="Password" name={PASSWORD} type="password" placeHolder="••••••••" isRequired={true} />
                  {isLoading ? <ButtonLoading text="Processing Login..." className="mt-2" /> : <ButtonIcon type="submit" icon="fa-solid fa-right-to-bracket" text="Sign In" className="mt-2 py-2.5" />}
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
