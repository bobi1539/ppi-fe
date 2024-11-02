"use client";

import Link from "next/link";
import { limitText, scrollToTop } from "../../utils/helper";
import { useEffect, useState } from "react";
import { PageResponse } from "@/app/dto/response/page-response";
import { NewsletterResponse } from "@/app/dto/response/newsletter-response";
import { webNewsletterFindAllPagination } from "@/app/backend-api/web-newsletter";
import { SearchDto } from "@/app/dto/search/search-dto";
import { FE_WEB_NEWSLETTER } from "@/app/constants/endpoint-fe";
import CardHover from "@/app/components/card/card-hover";
import Image from "next/image";
import { fileDownload } from "@/app/backend-api/file";
import { DIRECTORY_NEWSLETTER } from "@/app/constants/constant";
import PaginationTable from "@/app/components/table/pagination-table";

export default function Newsletter() {
  const [newsletterPages, setNewsletterPages] = useState<PageResponse<NewsletterResponse>>();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchNewsletter();
  }, [currentPage]);

  const fetchNewsletter = async (): Promise<void> => {
    const response = await webNewsletterFindAllPagination(buildSearchDto());
    setNewsletterPages(response);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: "",
      page: currentPage,
      size: 12,
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
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">Newsletter</h2>
        </div>
        <div className="grid gap-4 mt-12 md:mt-14 md:grid-cols-3">
          {newsletterPages?.content.map((newsletter) => (
            <Link key={newsletter.id} href={`${FE_WEB_NEWSLETTER}/${newsletter.slug}`}>
              <CardHover isScale={false}>
                <div className="grid grid-cols-5 p-2 gap-0 md:gap-4 md:flex md:flex-col cursor-pointer">
                  <div className="col-span-2 flex justify-center">
                    <Image key={newsletter.id} className="w-auto md:w-full h-40 md:h-64 lg:h-96 xl:h-[32rem] rounded-lg " src={fileDownload(DIRECTORY_NEWSLETTER, newsletter.cover)} alt={`${newsletter.title}`} width={1024} height={1024} priority />
                  </div>
                  <div className="col-span-3">
                    <h3 className={`${newsletter.deleted ? "text-red-500 line-through" : "text-gray-900"} text-xl font-bold`}>{newsletter.title}</h3>
                    <p className="text-justify text-sm text-gray-800">{limitText(newsletter.description, 100)}</p>
                  </div>
                </div>
              </CardHover>
            </Link>
          ))}
        </div>
        <div className="flex justify-end py-4">{newsletterPages?.totalElements && newsletterPages.totalElements > 0 && <PaginationTable total={newsletterPages?.totalPages ?? 0} handlePageChange={handlePageChange} />}</div>
      </div>
    </section>
  );
}
