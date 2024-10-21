"use client";

import { FE_EVENT } from "@/app/constants/endpoint-fe";
import { buildEventRequest } from "../../helper";
import { eventUpdate } from "@/app/backend-api/event";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import EventCreateOrUpdate from "../../create-or-update";

export default function EventUpdate({ params }: Readonly<{ params: { eventId: number } }>) {
  const router = useRouter();

  const submitUpdateEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildEventRequest(formData);
    await eventUpdate(params.eventId, request);
    await showSuccessDialog();
    router.push(FE_EVENT);
  };

  return <EventCreateOrUpdate submit={submitUpdateEvent} eventId={params.eventId} />;
}
