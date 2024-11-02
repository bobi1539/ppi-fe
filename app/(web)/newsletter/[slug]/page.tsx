"use client";

import { fileDownload } from "@/app/backend-api/file";
import { webNewsletterFindBySlug } from "@/app/backend-api/newsletter";
import { DIRECTORY_NEWSLETTER } from "@/app/constants/constant";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NewsletterDetailProps {
  params: {
    slug: string;
  };
}

export default function NewsletterDetail(props: Readonly<NewsletterDetailProps>) {
  const [newsletter, setNewsletter] = useState<NewsletterResponse>();

  useEffect(() => {
    fetchNewsletter();
  }, []);

  const fetchNewsletter = async (): Promise<void> => {
    const response = await webNewsletterFindBySlug(props.params.slug);
    setNewsletter(response);
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 md:py-16 md:px-6 mx-auto max-w-screen-xl flex justify-center">
        <Image key={newsletter?.id} src={fileDownload(DIRECTORY_NEWSLETTER, newsletter?.content ?? "")} alt={`${newsletter?.title}`} width={1024} height={1024} priority />
      </div>
    </section>
  );
}
