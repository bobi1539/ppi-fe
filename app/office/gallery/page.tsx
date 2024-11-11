"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../components/content-search";
import ContentTitle from "../components/content-title";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { eventFindAll } from "@/app/backend-api/event";
import { FE_GALLERY_CREATE } from "@/app/constants/endpoint-fe";
import { PageResponse } from "@/app/dto/response/page-response";
import { EventResponse } from "@/app/dto/response/event-response";
import { GallerySearchDto } from "@/app/dto/search/gallery-search-dto";
import { GalleryResponse } from "@/app/dto/response/gallery-response";
import { galleryDelete, galleryFindAllPagination } from "@/app/backend-api/gallery";
import FooterTable from "@/app/components/table/footer-table";
import Image from "next/image";
import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_GALLERY } from "@/app/constants/constant";
import InputSelect from "@/app/components/input/input-select";
import { EVENT_ID, getEventOptionsForSearch } from "./helper";
import { Option } from "@/app/components/input/input-select-label";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import LoadingOffice from "../loading";

export default function Gallery() {
  const [galleryPages, setGalleryPages] = useState<PageResponse<GalleryResponse>>();
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [eventOption, setEventOption] = useState<Option | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [galleryIdHover, setGalleryIdHover] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchGallery = useCallback(async (): Promise<void> => {
    const buildSearchDto = (): GallerySearchDto => {
      return {
        search: "",
        page: currentPage,
        size: 16,
        eventId: Number(eventOption?.value),
      };
    };

    setIsLoading(true);
    const response = await galleryFindAllPagination(buildSearchDto());
    setGalleryPages(response);
    setIsLoading(false);
  }, [currentPage, eventOption]);

  useEffect(() => {
    fetchGallery();
    fetchEvent();
  }, [fetchGallery]);

  const fetchEvent = async (): Promise<void> => {
    const response = await eventFindAll({ search: "", isDeleted: false });
    setEvents(response);
  };

  const hanldeSearchByEvent = (option: Option | null) => {
    setEventOption(option);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleCreateGallery = (): void => {
    router.push(FE_GALLERY_CREATE);
  };

  const handleDeleteGallery = async (id: number): Promise<void> => {
    setGalleryIdHover(id);
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await galleryDelete(id);
      showSuccessDialog();
      fetchGallery();
    }
    setGalleryIdHover(0);
  };

  return (
    <div>
      <ContentTitle title="Gallery" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSelect placeholder="--Event--" name={EVENT_ID} options={getEventOptionsForSearch(events)} onChange={hanldeSearchByEvent} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => handleCreateGallery()} type="button" icon="fa-solid fa-plus" text="Add Gallery" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
        {isLoading ? (
          <LoadingOffice />
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 p-4 pt-0">
            {galleryPages?.content.map((gallery) => (
              <div key={gallery.id} onClick={() => handleDeleteGallery(gallery.id)} className={`${galleryIdHover === gallery.id ? "scale-110 shadow-2xl" : ""} p-2 mb-4 rounded-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl`}>
                <Image className="rounded-lg" src={fileDownload(DIRECTORY_GALLERY, gallery.fileName)} alt={`${gallery.event.title}-gallery`} width={1024} height={1024} priority />
              </div>
            ))}
          </div>
        )}
        <FooterTable numberOfElements={galleryPages?.numberOfElements ?? 0} totalElements={galleryPages?.totalElements ?? 0} totalPages={galleryPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
