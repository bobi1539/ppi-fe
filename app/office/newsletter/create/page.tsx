"use client";

import { FE_NEWSLETTER } from "@/app/constants/endpoint-fe";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import { buildNewsletterRequest } from "../helper";
import { newsletterCreate } from "@/app/backend-api/newsletter";
import NewsletterCreateOrUpdate from "../create-or-update";

export default function NewsletterCreate() {
  const router = useRouter();

  const submitSaveEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildNewsletterRequest(formData);
    await newsletterCreate(request);
    await showSuccessDialog();
    router.push(FE_NEWSLETTER);
  };

  return <NewsletterCreateOrUpdate submit={submitSaveEvent} title="Add Newsletter" />;
}
