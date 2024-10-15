"use client";

import { useState } from "react";
import Button from "../components/button";
import InputLabel from "../components/input-label";
import ButtonLoading from "../components/button-loading";
import { FE_DASHBOARD } from "../constants/endpoint-fe";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    router.push(FE_DASHBOARD);
    setIsLoading(false);
  };

  return (
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
              <InputLabel name="username" type="text" placeHolder="" isRequired={true} />
              <InputLabel name="password" type="password" placeHolder="••••••••" isRequired={true} />
              {isLoading ? <ButtonLoading text="Processing Login..." className="mt-2" /> : <Button text="Sign In" className="mt-2" />}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
