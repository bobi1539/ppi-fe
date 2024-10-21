"use client";

import { FE_EVENT } from "@/app/constants/endpoint-fe";
import { buildCreateEventRequest } from "../helper";
import { eventCreate } from "@/app/backend-api/event";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import EventCreateOrUpdate from "../create-or-update";

export default function EventCreate() {
  const router = useRouter();

  const submitSaveEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildCreateEventRequest(formData);
    await eventCreate(request);
    await showSuccessDialog();
    router.push(FE_EVENT);
  };

  return <EventCreateOrUpdate submit={submitSaveEvent} title="Add Event" />;
}
