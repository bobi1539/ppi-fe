"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../components/content-search";
import ContentTitle from "../components/content-title";
import InputSearch from "../components/input-search";
import { useEffect, useState } from "react";
import { PageResponse } from "@/app/dto/response/page-response";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import { newsletterDelete, newsletterFindAllPagination, newsletterRestore } from "@/app/backend-api/newsletter";
import { SearchDto } from "@/app/dto/search/search-dto";
import { FE_NEWSLETTER, FE_NEWSLETTER_CREATE } from "@/app/constants/endpoint-fe";
import FooterTable from "@/app/components/table/footer-table";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_NEWSLETTER } from "@/app/constants/constant";
import { limitText } from "@/app/utils/helper";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import ActionCard from "../components/action-card";
import CardHover from "@/app/components/card/card-hover";
import LoadingOffice from "../loading";

export default function Newsletter() {
  const [newsletterPages, setNewsletterPages] = useState<PageResponse<NewsletterResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [popUpItemId, setPopUpItemId] = useState<number>(0);
  const [newsletterIdHover, setNewsletterIdHover] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchNewsletter();
  }, [currentPage, searchValue]);

  const fetchNewsletter = async (): Promise<void> => {
    setIsLoading(true);
    const response = await newsletterFindAllPagination(buildSearchDto());
    setNewsletterPages(response);
    setIsLoading(false);
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

  const handleClickNewsletter = (id: number): void => {
    setPopUpItemId(popUpItemId === id ? 0 : id);
    setNewsletterIdHover(newsletterIdHover === id ? 0 : id);
  };

  const handleCreateNewsletter = (): void => {
    router.push(FE_NEWSLETTER_CREATE);
  };

  const handleEditNewsletter = (id: number): void => {
    router.push(FE_NEWSLETTER + "/" + id + "/update");
  };

  const handleDeleteNewsletter = async (id: number): Promise<void> => {
    setNewsletterIdHover(id);
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await newsletterDelete(id);
      showSuccessDialog();
      fetchNewsletter();
    }
    setPopUpItemId(0);
    setNewsletterIdHover(0);
  };

  const handleRestoreNewsletter = async (id: number): Promise<void> => {
    setNewsletterIdHover(id);
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await newsletterRestore(id);
      showSuccessDialog();
      fetchNewsletter();
    }
    setPopUpItemId(0);
    setNewsletterIdHover(0);
  };

  return (
    <div>
      <ContentTitle title="Newsletter" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => handleCreateNewsletter()} type="button" icon="fa-solid fa-plus" text="Add Newsletter" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
        {isLoading ? (
          <LoadingOffice />
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8 pt-0 md:pt-2">
            {newsletterPages?.content.map((newsletter) => (
              <CardHover key={newsletter.id} isScale={newsletterIdHover === newsletter.id} onClick={() => handleClickNewsletter(newsletter.id)}>
                {(newsletter.deleted || popUpItemId === newsletter.id) && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer -m-2" />}
                <div className="grid grid-cols-5 gap-2 md:flex md:flex-col cursor-pointer">
                  <div className="col-span-2 flex justify-center">
                    <Image key={newsletter.id} className="w-auto md:w-full h-40 md:h-64 xl:h-96 rounded-lg " src={imageDownload(DIRECTORY_NEWSLETTER, newsletter.cover)} alt={`${newsletter.title}`} width={1024} height={1024} priority />
                  </div>
                  <div className="col-span-3">
                    <h3 className={`${newsletter.deleted ? "text-red-500 line-through" : "text-gray-900"} text-xl font-bold`}>{newsletter.title}</h3>
                    <p className="text-justify text-sm text-gray-800">{limitText(newsletter.description, 100)}</p>
                  </div>
                </div>
                {popUpItemId === newsletter.id && <ActionCard deleted={newsletter.deleted ?? false} handleEdit={() => handleEditNewsletter(newsletter.id)} handleDelete={() => handleDeleteNewsletter(newsletter.id)} handleRestore={() => handleRestoreNewsletter(newsletter.id)} />}
              </CardHover>
            ))}
          </div>
        )}

        <FooterTable numberOfElements={newsletterPages?.numberOfElements ?? 0} totalElements={newsletterPages?.totalElements ?? 0} totalPages={newsletterPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
