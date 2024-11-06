"use client";

import { FE_EVENT } from "@/app/constants/endpoint-fe";
import { buildEventRequest } from "../helper";
import { eventCreate } from "@/app/backend-api/event";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import EventCreateOrUpdate from "../create-or-update";
import { useState } from "react";

export default function EventCreate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitSaveEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildEventRequest(formData);
      await eventCreate(request);
      await showSuccessDialog();
      router.push(FE_EVENT);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <EventCreateOrUpdate isLoading={isLoading} submit={submitSaveEvent} title="Add Event" />;
}
