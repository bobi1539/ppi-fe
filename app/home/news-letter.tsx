"use client";

import Button from "../components/button";
import { showSuccessDialog, showConfirmDialog } from "../utils/sweet-alert";

export default function NewsLetter() {
  const subscribeNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await showConfirmDialog("Are you sure to subscribe?");
    if (result.isConfirmed) {
      showSuccessDialog("You have subscribed.");
    }
  };

  return (
    <section>
      <div className="bg-ternary-100 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-24 px-6 md:grid-cols-2 md:px-8">
          <div className="flex flex-col justify-center gap-2 md:gap-8 col-span-1">
            <div className="flex flex-col font-extrabold">
              <p className="inline text-3xl sm:block md:inline xl:block text-black">Subscribe to our</p>
              <p className="inline text-3xl sm:block md:inline xl:block text-orange-500">Newsletter</p>
            </div>
            <form onSubmit={subscribeNewsletter}>
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-700 sm:text-sm sm:leading-6" placeholder="Enter your email" />
                <Button text="Subscribe" />
              </div>
            </form>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 place-items-center">
            <a href="https://ppiwarwick.org/newsletter/Bimonthly-Newsletter-HOPE-2">
              <img className="aspect-auto" src="https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-2-cover.png" />
            </a>
            <a href="https://ppiwarwick.org/newsletter/Bimonthly-Newsletter-HOPE-1">
              <img className="aspect-auto" src="https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-1-cover.png" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
