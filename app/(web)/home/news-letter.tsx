"use client";

import { useEffect, useState } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { showSuccessDialog, showConfirmDialog } from "../../utils/sweet-alert";
import { PageResponse } from "@/app/dto/response/page-response";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import { webNewsletterFindAllPagination } from "@/app/backend-api/web-newsletter";
import Link from "next/link";
import { FE_WEB_NEWSLETTER } from "@/app/constants/endpoint-fe";
import Image from "next/image";
import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_NEWSLETTER } from "@/app/constants/constant";

export default function NewsLetter() {
  const [newsletters, setNewsletters] = useState<PageResponse<NewsletterResponse>>();

  useEffect(() => {
    fetchNewsletter();
  }, []);

  const fetchNewsletter = async (): Promise<void> => {
    const response = await webNewsletterFindAllPagination({ search: "", page: 0, size: 2 });
    setNewsletters(response);
  };

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
            {newsletters?.content.map((newsletter) => (
              <Link key={newsletter.id} href={`${FE_WEB_NEWSLETTER}/${newsletter.slug}`}>
                <Image key={newsletter.id} className="aspect-auto" src={fileDownload(DIRECTORY_NEWSLETTER, newsletter.cover)} alt={`${newsletter.title}`} width={1024} height={1024} priority />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
