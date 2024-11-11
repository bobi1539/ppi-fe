"use client";

import { FE_EVENT } from "@/app/constants/endpoint-fe";
import { buildEventRequest } from "../../helper";
import { eventFindById, eventUpdate } from "@/app/backend-api/event";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useRouter } from "next/navigation";
import EventCreateOrUpdate from "../../create-or-update";
import { useEffect, useState } from "react";
import { EventResponse } from "@/app/dto/response/event-response";

interface EventUpdateProps {
  params: {
    eventId: number;
  };
}

export default function EventUpdate(props: Readonly<EventUpdateProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<EventResponse>();
  const router = useRouter();

  useEffect(() => {
    const fetchEventById = async (): Promise<void> => {
      const response = await eventFindById(props.params.eventId);
      setEvent(response);
    };

    fetchEventById();
  }, [props.params.eventId]);

  const submitUpdateEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildEventRequest(formData, event?.cover);
      await eventUpdate(props.params.eventId, request);
      await showSuccessDialog();
      router.push(FE_EVENT);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <EventCreateOrUpdate isLoading={isLoading} submit={submitUpdateEvent} event={event} title="Edit Event" />;
}
