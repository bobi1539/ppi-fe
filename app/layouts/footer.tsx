"use client"

import Button from "../components/button";
import { showConfirmDialog, showSuccessDialog } from "../utils/sweet-alert";

export default function Footer() {
  const subscribeMailingList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await showConfirmDialog("Are you sure to subscribe?");
    if (result.isConfirmed) {
      showSuccessDialog("You have subscribed.");
    }
  };

  return (
    <footer className="mb-12 md:mb-6 md:py-8 bg-white py-0">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-12 md:gap-8 md:px-8 place-items-center md:place-items-start">
        <div className="flex flex-col max-w-xl text-black md:col-span-7 items-center text-center md:items-start md:text-left">
          <img src="https://ppiwarwick.org/logo.png" className="w-48" alt="PPIW Logo" />
          <p className="inline sm:block md:inline xl:block text-secondary-700 font-bold">Inquiries? Contact Us:</p>
          <p className="inline sm:block md:inline xl:block">ppiwarwick@gmail.com</p>
          <p className="inline sm:block md:inline xl:block">Angel : +447585423161</p>
        </div>
        <form onSubmit={subscribeMailingList} className="w-full max-w-md md:col-span-5 md:pt-10 bottom-0 text-center md:text-left">
          <div className="max-w-xl text-xl font-bold tracking-tight text-gray-900 sm:text-3xl md:col-span-7 mb-4 mt-4 md:mt-0">
            <p className="inline sm:block md:inline xl:block">Join our partnership</p>
            <br />
            <p className="inline sm:block md:inline xl:block text-secondary-700">Mailing List!</p>
          </div>
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter your email" />
            <Button text="Subscribe" />
          </div>
        </form>
      </div>
    </footer>
  );
}
