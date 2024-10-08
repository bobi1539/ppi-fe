"use client";

import Button from "../components/button";
import InputLabel from "../components/input-label";

export default function Login() {
  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Success");
  };

  return (
    <section className="bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="space-y-4 md:space-y-6 p-8 md:p6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">Sign in to your account</h1>
            <form onSubmit={submitLogin} className="flex flex-col gap-4">
              <InputLabel name="username" type="text" placeHolder="" isRequired={true} />
              <InputLabel name="password" type="password" placeHolder="••••••••" isRequired={true} />
              <Button text="Sign In" />
              {/* <button type="submit" className="w-full mt-2 text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <div>
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sedang memproses login...
                </div>
                <div>Sign In</div>
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
