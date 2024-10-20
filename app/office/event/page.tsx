"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../components/content-title";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";
import { eventFindAllPagination } from "@/app/backend-api/event";
import { SearchDto } from "@/app/dto/search/search-dto";
import ContentSearch from "../components/content-search";
import InputSearch from "../components/input-search";
import ButtonIcon from "@/app/components/button/button-icon";
import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_EVENT } from "@/app/constants/constant";
import { formatDate } from "@/app/utils/date-helper";
import { limitText } from "@/app/utils/helper";
import FooterTable from "@/app/components/table/footer-table";
import Link from "next/link";
import { FE_EVENT_CREATE } from "@/app/constants/endpoint-fe";

export default function Event() {
  const [eventPages, setEventPages] = useState<PageResponse<EventResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchEvent();
  }, [currentPage, searchValue]);

  const fetchEvent = async (): Promise<void> => {
    const response = await eventFindAllPagination(buildSearchDto());
    setEventPages(response);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: searchValue,
      page: currentPage,
      size: 8,
    };
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  return (
    <div>
      <ContentTitle title="Event" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <Link href={FE_EVENT_CREATE}>
              <ButtonIcon type="button" icon="fa-solid fa-plus" text="Add Event" className="w-full md:w-auto" />
            </Link>
          </div>
        </ContentSearch>
        <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-8 pt-0 md:pt-4">
          {eventPages?.content.map((event) => (
            <div key={event.id} className="grid grid-cols-5 gap-2 justify-center md:flex md:flex-col cursor-pointer">
              <div className="col-span-2 flex justify-center">
                <img key={event.id} className="w-auto md:w-full h-40 md:h-64 xl:h-96 rounded-lg " src={`${imageDownload(DIRECTORY_EVENT, event.cover)}&v=${new Date().getTime()}${event.id}`} alt={`${event.title} ... ${event.id}`} />
              </div>
              <div className="col-span-3">
                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                <p className="text-xs text-gray-500">{formatDate(event.startDate)}</p>
                <p className="text-xs mb-2.5 text-gray-500">{`${event.startTime} - ${event.endTime} (${event.duration})`}</p>
                <p className="text-justify text-sm text-gray-800">{limitText(event.description, 100)}</p>
              </div>
            </div>
          ))}
        </div>
        <FooterTable numberOfElements={eventPages?.numberOfElements ?? 0} totalElements={eventPages?.totalElements ?? 0} totalPages={eventPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
