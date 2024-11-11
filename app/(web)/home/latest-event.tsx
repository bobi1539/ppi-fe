"use client";

import { webEventFindAllPagination } from "@/app/backend-api/event";
import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_EVENT } from "@/app/constants/constant";
import { FE_WEB_EVENT } from "@/app/constants/endpoint-fe";
import { EventResponse } from "@/app/dto/response/event-response";
import { PageResponse } from "@/app/dto/response/page-response";
import { SearchDto } from "@/app/dto/search/search-dto";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LatestEvent() {
  const [eventPages, setEventPages] = useState<PageResponse<EventResponse>>();

  useEffect(() => {
    const buildSearchDto = (): SearchDto => {
      return {
        search: "",
        page: 0,
        size: 2,
      };
    };

    const fetchEvent = async (): Promise<void> => {
      const response = await webEventFindAllPagination(buildSearchDto());
      setEventPages(response);
    };

    fetchEvent();
  }, []);

  return (
    <section>
      <div className=" bg-white px-0 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-6 md:grid-cols-5 md:gap-8 md:px-8 md:divide-x-4 md:divide-secondary-700">
          <div className="grid grid-cols-2 md:col-span-3 gap-4">
            {eventPages?.content.map((event) => (
              <Link key={event.id} href={`${FE_WEB_EVENT}/${event.slug}`} className="flex-wrap flex-1">
                <Image key={event.id} className="aspect-[3/4]" src={fileDownload(DIRECTORY_EVENT, event.cover)} alt={`${event.title}`} width={1024} height={1024} priority />
              </Link>
            ))}
          </div>
          <div className="flex flex-row gap-2 text-center justify-between md:text-left md:flex-col text-black md:col-span-2 md:pl-8">
            <p className="inline text-3xl sm:block md:inline xl:block text-black font-extrabold text-right md:text-left w-full">Latest</p>
            <p className="inline text-3xl sm:block md:inline xl:block text-orange-500 font-extrabold text-left w-full">Events</p>
            <div className="p-0 hidden md:flex h-full justify-start items-end -ml-8 -mb-6">
              <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#6d28d9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />{" "}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
