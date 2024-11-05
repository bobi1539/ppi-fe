"use client";

import { webEventFindBySlug } from "@/app/backend-api/event";
import { fileDownload } from "@/app/backend-api/file";
import { webGalleryFindAll } from "@/app/backend-api/gallery";
import Nl2Br from "@/app/components/paragraph/nl2br";
import { DEFAULT_IMAGE_URL, DIRECTORY_EVENT, DIRECTORY_GALLERY } from "@/app/constants/constant";
import { EventResponse } from "@/app/dto/response/event-response";
import { GalleryResponse } from "@/app/dto/response/gallery-response";
import { formatDate } from "@/app/utils/date-helper";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EventDetailProps {
  params: {
    slug: string;
  };
}

export default function EventDetail(props: Readonly<EventDetailProps>) {
  const [event, setEvent] = useState<EventResponse>();
  const [galleries, setGalleries] = useState<GalleryResponse[]>([]);
  const [eventCoverUrl, setEventCoverUrl] = useState<string>(DEFAULT_IMAGE_URL);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async (): Promise<void> => {
    const response = await webEventFindBySlug(props.params.slug);
    setEvent(response);
    fetchGallery(response.id);
    setEventCoverUrl(fileDownload(DIRECTORY_EVENT, response.cover));
  };

  const fetchGallery = async (eventId: number): Promise<void> => {
    const response = await webGalleryFindAll({ search: "", eventId: eventId });
    setGalleries(response);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto py-4 px-4 md:py-16 md:max-w-7xl md:px-8 grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-16">
        <div className="md:col-span-1">
          <Image key={event?.id} className="rounded-lg" src={eventCoverUrl} alt={event?.title ?? ""} width={1024} height={1024} priority />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex flex-row gap-2">{event?.title}</h1>
          <p className="text-sm text-gray-500">{formatDate(event?.startDate ?? "")}</p>
          <p className="text-sm text-gray-500">{`${event?.startTime} - ${event?.endTime}`}</p>
          <h2 className="sr-only">Description</h2>
          <Nl2Br text={event?.description ?? ""} className="mt-2" />
        </div>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 p-4 md:p-8 bg-secondary-100">
        {galleries.map((gallery) => (
          <div key={gallery.id} className="p-2 mb-4 rounded-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
            <Image className="rounded-lg" src={fileDownload(DIRECTORY_GALLERY, gallery.fileName)} alt={`${gallery.event.title}-gallery`} width={1024} height={1024} priority />
          </div>
        ))}
      </div>
    </section>
  );
}
