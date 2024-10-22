"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { useEffect, useState } from "react";
import { PageResponse } from "@/app/dto/response/page-response";
import { DivisionResponse } from "@/app/dto/response/division-response";
import { DivisionSearchDto } from "@/app/dto/search/division-search-dto";
import { CONSTANT_PAGE_SIZE_VALUE, ICON_DELETE, ICON_EDIT, ICON_RESTORE, TEXT_COLOR_DELETE, TEXT_COLOR_EDIT, TEXT_COLOR_RESTORE, TEXT_DELETE, TEXT_EDIT, TEXT_RESTORE } from "@/app/constants/constant";
import { divisionDelete, divisionFindAllPagination, divisionRestore } from "@/app/backend-api/division";
import CustomTable from "@/app/components/table/custom-table";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import FooterTable from "@/app/components/table/footer-table";
import CommitteeDepartmentModalCreate from "./create";
import { periodFindAll } from "@/app/backend-api/period";
import { PeriodResponse } from "@/app/dto/response/period-response";
import CommitteeDepartmentModalUpdate from "./update";
import { getPeriodOptions, PERIOD_ID } from "./helper";
import ContentSearch from "../../components/content-search";
import InputSelectSearch from "@/app/components/input/input-select-search";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";

export default function CommitteeDepartment() {
  const [divisionPages, setDivisionPages] = useState<PageResponse<DivisionResponse>>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [divisionIdUpdate, setDivisionIdUpdate] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [periodId, setPeriodId] = useState<number | undefined>();
  const [periods, setPeriods] = useState<PeriodResponse[]>([]);

  useEffect(() => {
    fetchDivision();
    fetchPeriod();
  }, [currentPage, searchValue, periodId]);

  const fetchDivision = async (): Promise<void> => {
    const response = await divisionFindAllPagination(buildSearchDto());
    setDivisionPages(response);
  };

  const buildSearchDto = (): DivisionSearchDto => {
    return {
      search: searchValue,
      page: currentPage,
      size: CONSTANT_PAGE_SIZE_VALUE,
      periodId: periodId,
    };
  };

  const fetchPeriod = async (): Promise<void> => {
    const response = await periodFindAll({ search: "", isDeleted: false });
    setPeriods(response);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleEditDivision = (id: number): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
    setDivisionIdUpdate(id);
  };

  const handleDeleteDivision = async (divisionId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to delete?");
    if (result.isConfirmed) {
      await divisionDelete(divisionId);
      showSuccessDialog();
      fetchDivision();
    }
  };

  const handleRestoreDivision = async (divisionId: number): Promise<void> => {
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await divisionRestore(divisionId);
      showSuccessDialog();
      fetchDivision();
    }
  };

  const headsTable = ["seq", "department name", "committee name", ""];

  return (
    <div>
      <ContentTitle title="Committee Department" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <InputSelectSearch title="--Commitee--" name={PERIOD_ID} options={getPeriodOptions(periods)} currentValue={periodId?.toString() ?? ""} onChange={(e) => setPeriodId(Number(e.target.value))} />
        </ContentSearch>
        <div className="p-4 pt-0 flex justify-end items-center">
          <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add Department" className="w-full md:w-auto" />
        </div>
        <CustomTable heads={headsTable}>
          {divisionPages?.content.map((division, index) => (
            <tr key={division.id} className={`${division.deleted ? "line-through text-red-500" : ""} border-b text-center`}>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {division.name}
              </td>
              <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                {division.period.name}
              </td>
              <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                <CustomDropdown>
                  {division.deleted ? <CustomDropdownItem onClick={() => handleRestoreDivision(division.id)} className={TEXT_COLOR_RESTORE} icon={ICON_RESTORE} text={TEXT_RESTORE} /> : <CustomDropdownItem onClick={() => handleEditDivision(division.id)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />}
                  <CustomDropdownItem onClick={() => handleDeleteDivision(division.id)} className={TEXT_COLOR_DELETE} icon={ICON_DELETE} text={TEXT_DELETE} />
                </CustomDropdown>
              </td>
            </tr>
          ))}
        </CustomTable>
        <FooterTable numberOfElements={divisionPages?.numberOfElements ?? 0} totalElements={divisionPages?.totalElements ?? 0} totalPages={divisionPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
        {isModalCreateOpen && <CommitteeDepartmentModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchDivision={fetchDivision} />}
        {isModalUpdateOpen && <CommitteeDepartmentModalUpdate id={divisionIdUpdate} closeModal={() => setIsModalUpdateOpen(false)} fetchDivision={fetchDivision} />}
      </section>
    </div>
  );
}
