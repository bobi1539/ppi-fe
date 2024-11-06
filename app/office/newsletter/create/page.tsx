"use client";

import { FE_NEWSLETTER } from "@/app/constants/endpoint-fe";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import { buildNewsletterRequest } from "../helper";
import { newsletterCreate } from "@/app/backend-api/newsletter";
import NewsletterCreateOrUpdate from "../create-or-update";
import { useState } from "react";

export default function NewsletterCreate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitSaveEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildNewsletterRequest(formData);
      await newsletterCreate(request);
      await showSuccessDialog();
      router.push(FE_NEWSLETTER);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <NewsletterCreateOrUpdate isLoading={isLoading} submit={submitSaveEvent} title="Add Newsletter" />;
}
