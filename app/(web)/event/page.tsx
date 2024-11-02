"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";
import { webEventFindAllPagination } from "@/app/backend-api/web-event";
import { SearchDto } from "@/app/dto/search/search-dto";
import CardEvent from "@/app/components/card/card-event";
import CardHover from "@/app/components/card/card-hover";

export default function Event() {
  const [eventPages, setEventPages] = useState<PageResponse<EventResponse>>();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async (): Promise<void> => {
    const response = await webEventFindAllPagination(buildSearchDto());
    setEventPages(response);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: "",
      page: 0,
      size: 16,
    };
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">Event</h2>
        </div>
        <div className="grid gap-6 mt-12 md:mt-14 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {eventPages?.content.map((event) => (
            <Link key={event.id} href={""}>
              <CardHover isScale={false}>
                <CardEvent event={event} />
              </CardHover>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
