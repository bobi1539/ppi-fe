"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import ButtonIcon from "@/app/components/button/button-icon";
import { PageResponse } from "@/app/dto/response/page-response";
import { PeriodResponse } from "@/app/dto/response/period-response";
import { periodDelete, periodFindAllPagination, periodRestore } from "@/app/backend-api/period";
import { SearchDto } from "@/app/dto/search/search-dto";
import { CONSTANT_PAGE_SIZE_VALUE } from "@/app/constants/constant";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import CustomTable, { handleDropDownAction } from "@/app/components/table/custom-table";
import ButtonDropdown from "@/app/components/button/button-dropdown";
import FooterTable from "@/app/components/table/footer-table";
import { formatDate } from "@/app/utils/date-helper";
import BadgeActive from "@/app/components/badge/badge-active";
import BadgeInactive from "@/app/components/badge/badge-inactive";
import CommitteeDataModalCreate from "./create";
import CommitteeDataModalUpdate from "./update";

export default function CommitteeData() {
  const [periodPages, setPeriodPages] = useState<PageResponse<PeriodResponse>>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [periodIdUpdate, setPeriodIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDropDownTableOpen, setIsDropDownTableOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchPeriod();
  }, [currentPage, searchValue]);

  const fetchPeriod = async (): Promise<void> => {
    const response = await periodFindAllPagination(buildSearchDto());
    setPeriodPages(response);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: searchValue,
      page: currentPage,
      size: CONSTANT_PAGE_SIZE_VALUE,
    };
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleDropDownTableOpen = (id: number): void => {
    handleDropDownAction(id, setIsDropDownTableOpen);
  };

  const handleEditPeriod = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setPeriodIdUpdate(id);
    handleDropDownTableOpen(id);
  };

  const handleDeletePeriod = async (periodId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await periodDelete(periodId);
      showSuccessDialog();
      fetchPeriod();
      handleDropDownTableOpen(periodId);
    }
  };

  const handleRestorePeriod = async (periodId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await periodRestore(periodId);
      showSuccessDialog();
      fetchPeriod();
      handleDropDownTableOpen(periodId);
    }
  };

  const headsTable = ["seq", "committee name", "start", "end", "status", ""];

  return (
    <div>
      <ContentTitle title="Committee Data" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <div className="flex flex-col md:flex-row justify-between gap-3 p-4">
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add Committee Data" className="w-full md:w-auto" />
        </div>
        <CustomTable heads={headsTable}>
          {periodPages?.content.map((period, index) => (
            <tr key={period.id} className={`${period.deleted ? "line-through text-red-500" : ""} border-b text-center`}>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {period.name}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {formatDate(period.startDate)}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {formatDate(period.endDate)}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {period.status ? <BadgeActive /> : <BadgeInactive />}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                <button onClick={() => handleDropDownTableOpen(period.id)} className="w-7 h-7 p-4 inline-flex items-center justify-center text-sm font-medium hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg" type="button">
                  <i className="fa-solid fa-ellipsis fa-lg" />
                </button>
                <div className="absolute">
                  <div className={`${isDropDownTableOpen[period.id] ? "" : "hidden"} absolute mt-3 z-50 w-44 bg-white rounded shadow py-1 -left-32 md:-left-28 xl:-left-10`}>
                    <ul className="divide-y divide-gray-100">
                      <li>{period.deleted ? <ButtonDropdown onClick={() => handleRestorePeriod(period.id)} text="Restore" icon="fa-solid fa-trash-can-arrow-up" className="text-secondary-700" /> : <ButtonDropdown onClick={() => handleEditPeriod(period.id)} text="Edit" icon="fa-solid fa-pen-to-square" />}</li>
                      <li>
                        <ButtonDropdown onClick={() => handleDeletePeriod(period.id)} text="Delete" icon="fa-solid fa-trash-can" className="text-red-500" />
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
        <FooterTable numberOfElements={periodPages?.numberOfElements ?? 0} totalElements={periodPages?.totalElements ?? 0} totalPages={periodPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
        {isModalCreateOpen && <CommitteeDataModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchPeriod={fetchPeriod} />}
        {isModalUpdateOpen && <CommitteeDataModalUpdate id={periodIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchPeriod={fetchPeriod} />}
      </section>
    </div>
  );
}
