"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";
import { SearchDto } from "@/app/dto/search/search-dto";
import CardEvent from "@/app/components/card/card-event";
import CardHover from "@/app/components/card/card-hover";
import PaginationTable from "@/app/components/table/pagination-table";
import { scrollToTop } from "@/app/utils/helper";
import { FE_WEB_EVENT } from "@/app/constants/endpoint-fe";
import { webEventFindAllPagination } from "@/app/backend-api/event";

export default function Event() {
  const [eventPages, setEventPages] = useState<PageResponse<EventResponse>>();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchEvent();
  }, [currentPage]);

  const fetchEvent = async (): Promise<void> => {
    const response = await webEventFindAllPagination(buildSearchDto());
    setEventPages(response);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: "",
      page: currentPage,
      size: 16,
    };
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
    scrollToTop();
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">Event</h2>
        </div>
        <div className="grid gap-6 mt-12 md:mt-14 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {eventPages?.content.map((event) => (
            <Link key={event.id} href={`${FE_WEB_EVENT}/${event.slug}`}>
              <CardHover isScale={false}>
                <CardEvent event={event} />
              </CardHover>
            </Link>
          ))}
        </div>
        <div className="flex justify-end py-4">{eventPages?.totalElements && eventPages.totalElements > 0 && <PaginationTable total={eventPages?.totalPages ?? 0} handlePageChange={handlePageChange} />}</div>
      </div>
    </section>
  );
}
