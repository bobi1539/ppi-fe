"use client";

import { FE_NEWSLETTER } from "@/app/constants/endpoint-fe";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import { newsletterFindById, newsletterUpdate } from "@/app/backend-api/newsletter";
import { buildNewsletterRequest } from "../../helper";
import NewsletterCreateOrUpdate from "../../create-or-update";

interface NewsletterUpdateProps {
  params: {
    newsletterId: number;
  };
}

export default function NewsletterUpdate(props: Readonly<NewsletterUpdateProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newsletter, setNewsletter] = useState<NewsletterResponse>();
  const router = useRouter();

  useEffect(() => {
    const fetchNewsletterById = async (): Promise<void> => {
      const response = await newsletterFindById(props.params.newsletterId);
      setNewsletter(response);
    };

    fetchNewsletterById();
  }, [props.params.newsletterId]);

  const submitUpdateNewsletter = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildNewsletterRequest(formData, newsletter?.cover, newsletter?.content);
      await newsletterUpdate(props.params.newsletterId, request);
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
