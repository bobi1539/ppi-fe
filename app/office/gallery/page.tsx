"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../components/content-search";
import ContentTitle from "../components/content-title";
import InputSearch from "../components/input-search";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchDto } from "@/app/dto/search/search-dto";
import { eventFindAllPagination } from "@/app/backend-api/event";
import { FE_GALLERY_CREATE } from "@/app/constants/endpoint-fe";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";

export default function Gallery() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [popUpItemId, setPopUpItemId] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    fetchEvent();
  }, [currentPage, searchValue]);

  const fetchEvent = async (): Promise<void> => {
    // const response = await eventFindAllPagination(buildSearchDto());
    // setEventPages(response);
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

  const handleCreateEvent = (): void => {
    router.push(FE_GALLERY_CREATE);
  };

  return (
    <div>
      <ContentTitle title="Gallery" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => handleCreateEvent()} type="button" icon="fa-solid fa-plus" text="Add Gallery" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
      </section>
    </div>
  );
}
