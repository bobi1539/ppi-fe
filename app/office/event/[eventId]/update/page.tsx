"use client";

import { FE_EVENT } from "@/app/constants/endpoint-fe";
import { buildUpdateEventRequest } from "../../helper";
import { eventFindById, eventUpdate } from "@/app/backend-api/event";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import EventCreateOrUpdate from "../../create-or-update";
import { useEffect, useState } from "react";
import { EventResponse } from "@/app/dto/response/event-response";

export default function EventUpdate({ params }: Readonly<{ params: { eventId: number } }>) {
  const [event, setEvent] = useState<EventResponse>();
  const router = useRouter();

  useEffect(() => {
    fetchEventById();
  }, []);

  const fetchEventById = async (): Promise<void> => {
    const response = await eventFindById(params.eventId);
    setEvent(response);
  };

  const submitUpdateEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildUpdateEventRequest(formData, event?.cover ?? "");
    await eventUpdate(params.eventId, request);
    await showSuccessDialog();
    router.push(FE_EVENT);
  };

  return <EventCreateOrUpdate submit={submitUpdateEvent} event={event} title="Edit Event" />;
}
