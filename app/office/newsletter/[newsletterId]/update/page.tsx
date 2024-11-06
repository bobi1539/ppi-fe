"use client";

import { FE_NEWSLETTER } from "@/app/constants/endpoint-fe";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import { newsletterFindById, newsletterUpdate } from "@/app/backend-api/newsletter";
import { buildNewsletterRequest } from "../../helper";
import NewsletterCreateOrUpdate from "../../create-or-update";

export default function NewsletterUpdate({ params }: Readonly<{ params: { newsletterId: number } }>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newsletter, setNewsletter] = useState<NewsletterResponse>();
  const router = useRouter();

  useEffect(() => {
    fetchNewsletterById();
  }, []);

  const fetchNewsletterById = async (): Promise<void> => {
    const response = await newsletterFindById(params.newsletterId);
    setNewsletter(response);
  };

  const submitUpdateNewsletter = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildNewsletterRequest(formData, newsletter?.cover, newsletter?.content);
      await newsletterUpdate(params.newsletterId, request);
      await showSuccessDialog();
      router.push(FE_NEWSLETTER);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <NewsletterCreateOrUpdate isLoading={isLoading} submit={submitUpdateNewsletter} newsletter={newsletter} title="Edit Newsletter" />;
}
