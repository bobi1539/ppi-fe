"use client";

import { useEffect, useState } from "react";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import ButtonIcon from "@/app/components/button/button-icon";
import { PageResponse } from "@/app/dto/response/page-response";
import { PeriodResponse } from "@/app/dto/response/period-response";
import { periodDelete, periodFindAllPagination, periodRestore } from "@/app/backend-api/period";
import { SearchDto } from "@/app/dto/search/search-dto";
import { CONSTANT_PAGE_SIZE_VALUE, ICON_DELETE, ICON_EDIT, ICON_RESTORE, TEXT_COLOR_DELETE, TEXT_COLOR_EDIT, TEXT_COLOR_RESTORE, TEXT_DELETE, TEXT_EDIT, TEXT_RESTORE } from "@/app/constants/constant";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import CustomTable from "@/app/components/table/custom-table";
import FooterTable from "@/app/components/table/footer-table";
import { formatDate } from "@/app/utils/date-helper";
import BadgeActive from "@/app/components/badge/badge-active";
import BadgeInactive from "@/app/components/badge/badge-inactive";
import CommitteeDataModalCreate from "./create";
import CommitteeDataModalUpdate from "./update";
import ContentSearch from "../../components/content-search";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";

export default function CommitteeData() {
  const [periodPages, setPeriodPages] = useState<PageResponse<PeriodResponse>>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [periodIdUpdate, setPeriodIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  const handleEditPeriod = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setPeriodIdUpdate(id);
  };

  const handleDeletePeriod = async (periodId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await periodDelete(periodId);
      showSuccessDialog();
      fetchPeriod();
    }
  };

  const handleRestorePeriod = async (periodId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await periodRestore(periodId);
      showSuccessDialog();
      fetchPeriod();
    }
  };

  const headsTable = ["seq", "committee name", "start", "end", "status", ""];

  return (
    <div>
      <ContentTitle title="Committee Data" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add Committee Data" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
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
                <CustomDropdown>
                  {period.deleted ? <CustomDropdownItem onClick={() => handleRestorePeriod(period.id)} className={TEXT_COLOR_RESTORE} icon={ICON_RESTORE} text={TEXT_RESTORE} /> : <CustomDropdownItem onClick={() => handleEditPeriod(period.id)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />}
                  <CustomDropdownItem onClick={() => handleDeletePeriod(period.id)} className={TEXT_COLOR_DELETE} icon={ICON_DELETE} text={TEXT_DELETE} />
                </CustomDropdown>
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
