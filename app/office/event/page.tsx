"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../components/content-title";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";
import { eventDelete, eventFindAllPagination, eventRestore } from "@/app/backend-api/event";
import { SearchDto } from "@/app/dto/search/search-dto";
import ContentSearch from "../components/content-search";
import InputSearch from "../components/input-search";
import ButtonIcon from "@/app/components/button/button-icon";
import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_EVENT } from "@/app/constants/constant";
import { formatDate } from "@/app/utils/date-helper";
import { limitText } from "@/app/utils/helper";
import FooterTable from "@/app/components/table/footer-table";
import { FE_EVENT, FE_EVENT_CREATE } from "@/app/constants/endpoint-fe";
import { useRouter } from "next/navigation";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import Image from "next/image";
import ActionCard from "../components/action-card";

export default function Event() {
  const [eventPages, setEventPages] = useState<PageResponse<EventResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [popUpItemId, setPopUpItemId] = useState<number>(0);
  const router = useRouter();

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

  const handleCreateEvent = (): void => {
    router.push(FE_EVENT_CREATE);
  };

  const handleEditEvent = (id: number): void => {
    router.push(FE_EVENT + "/" + id + "/update");
  };

  const handleDeleteEvent = async (id: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await eventDelete(id);
      showSuccessDialog();
      fetchEvent();
    }
  };

  const handleRestoreEvent = async (id: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await eventRestore(id);
      showSuccessDialog();
      fetchEvent();
    }
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
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8 pt-0 md:pt-2">
          {eventPages?.content.map((event) => (
            <div key={event.id} onClick={() => setPopUpItemId(popUpItemId === event.id ? 0 : event.id)} className="relative p-2">
              {(event.deleted || popUpItemId === event.id) && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer -m-2" />}
              <div className="grid grid-cols-5 gap-2 md:flex md:flex-col cursor-pointer">
                <div className="col-span-2 flex justify-center">
                  <Image key={event.id} className="w-auto md:w-full h-40 md:h-64 xl:h-96 rounded-lg " src={imageDownload(DIRECTORY_EVENT, event.cover)} alt={`${event.title}`} width={1024} height={1024} priority />
                </div>
                <div className="col-span-3">
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <p className="text-xs text-gray-500">{formatDate(event.startDate)}</p>
                  <p className="text-xs mb-2.5 text-gray-500">{`${event.startTime} - ${event.endTime} (${event.duration})`}</p>
                  <p className="text-justify text-sm text-gray-800">{limitText(event.description, 100)}</p>
                </div>
              </div>
              {popUpItemId === event.id && <ActionCard deleted={event.deleted ?? false} handleEdit={() => handleEditEvent(event.id)} handleDelete={() => handleDeleteEvent(event.id)} handleRestore={() => handleRestoreEvent(event.id)} />}
            </div>
          ))}
        </div>
        <FooterTable numberOfElements={eventPages?.numberOfElements ?? 0} totalElements={eventPages?.totalElements ?? 0} totalPages={eventPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
