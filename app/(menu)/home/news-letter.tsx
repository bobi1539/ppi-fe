"use client";

import Button from "../../components/button";
import Input from "../../components/input";
import { showSuccessDialog, showConfirmDialog } from "../../utils/sweet-alert";

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
      <div className="bg-tertiary-100 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-24 px-6 md:grid-cols-2 md:px-8">
          <div className="flex flex-col justify-center gap-2 md:gap-8 col-span-1">
            <div className="flex flex-col font-extrabold">
              <p className="inline text-3xl sm:block md:inline xl:block text-black">Subscribe to our</p>
              <p className="inline text-3xl sm:block md:inline xl:block text-orange-500">Newsletter</p>
            </div>
            <form onSubmit={subscribeNewsletter}>
              <div className="flex gap-x-4">
                <Input name="email" type="email" autoComplete="email" placeHolder="Enter your email" isRequired={true} />
                <Button text="Subscribe" />
              </div>
            </form>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 place-items-center">
            <a href="https://ppiwarwick.org/newsletter/Bimonthly-Newsletter-HOPE-2">
              <img className="aspect-auto" src="https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-2-cover.png" alt="..." />
            </a>
            <a href="https://ppiwarwick.org/newsletter/Bimonthly-Newsletter-HOPE-1">
              <img className="aspect-auto" src="https://ppiwarwick.org/file/newsletter/Bimonthly-Newsletter-HOPE-1-cover.png" alt="..." />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
