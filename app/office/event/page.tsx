"use client";

import { useCallback, useEffect, useState } from "react";
import ContentTitle from "../components/content-title";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";
import { eventDelete, eventFindAllPagination, eventRestore } from "@/app/backend-api/event";
import { SearchDto } from "@/app/dto/search/search-dto";
import ContentSearch from "../components/content-search";
import InputSearch from "../components/input-search";
import ButtonIcon from "@/app/components/button/button-icon";
import FooterTable from "@/app/components/table/footer-table";
import { FE_EVENT, FE_EVENT_CREATE } from "@/app/constants/endpoint-fe";
import { useRouter } from "next/navigation";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import ActionCard from "../components/action-card";
import CardHover from "@/app/components/card/card-hover";
import LoadingOffice from "../loading";
import CardEvent from "@/app/components/card/card-event";

export default function Event() {
  const [eventPages, setEventPages] = useState<PageResponse<EventResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [popUpItemId, setPopUpItemId] = useState<number>(0);
  const [eventIdHover, setEventIdHover] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchEvent = useCallback(async (): Promise<void> => {
    const buildSearchDto = (): SearchDto => {
      return {
        search: searchValue,
        page: currentPage,
        size: 8,
      };
    };

    setIsLoading(true);
    const response = await eventFindAllPagination(buildSearchDto());
    setEventPages(response);
    setIsLoading(false);
  }, [currentPage, searchValue]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleClickEvent = (id: number): void => {
    setPopUpItemId(popUpItemId === id ? 0 : id);
    setEventIdHover(eventIdHover === id ? 0 : id);
  };

  const handleCreateEvent = (): void => {
    router.push(FE_EVENT_CREATE);
  };

  const handleEditEvent = (id: number): void => {
    router.push(FE_EVENT + "/" + id + "/update");
  };

  const handleDeleteEvent = async (id: number): Promise<void> => {
    setEventIdHover(id);
    try {
      const result = await showConfirmDialog("Are you sure to delete?");
      if (result.isConfirmed) {
        await eventDelete(id);
        showSuccessDialog();
        fetchEvent();
      }
    } catch (error) {
      console.log(error);
    }
    setPopUpItemId(0);
    setEventIdHover(0);
  };

  const handleRestoreEvent = async (id: number): Promise<void> => {
    setEventIdHover(id);
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await eventRestore(id);
      showSuccessDialog();
      fetchEvent();
    }
    setPopUpItemId(0);
    setEventIdHover(0);
  };

  return (
    <div>
      <ContentTitle title="Event" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => handleCreateEvent()} type="button" icon="fa-solid fa-plus" text="Add Event" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
        {isLoading ? (
          <LoadingOffice />
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8 pt-0 md:pt-2">
            {eventPages?.content.map((event) => (
              <CardHover key={event.id} isScale={eventIdHover === event.id} onClick={() => handleClickEvent(event.id)}>
                {(event.deleted || popUpItemId === event.id) && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer -m-2" />}
                <CardEvent event={event} />
                {popUpItemId === event.id && <ActionCard deleted={event.deleted ?? false} handleEdit={() => handleEditEvent(event.id)} handleDelete={() => handleDeleteEvent(event.id)} handleRestore={() => handleRestoreEvent(event.id)} />}
              </CardHover>
            ))}
          </div>
        )}
        <FooterTable numberOfElements={eventPages?.numberOfElements ?? 0} totalElements={eventPages?.totalElements ?? 0} totalPages={eventPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
