"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../../components/content-search";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FE_STUDENT, FE_STUDENT_CREATE } from "@/app/constants/endpoint-fe";
import { PageResponse } from "@/app/dto/response/page-response";
import { StudentResponse } from "@/app/dto/response/student-response";
import { studentDelete, studentFindAllPagination, studentRestore } from "@/app/backend-api/student";
import { SearchDto } from "@/app/dto/search/search-dto";
import Image from "next/image";
import { fileDownload } from "@/app/backend-api/file";
import { CONSTANT_PAGE_SIZE_VALUE, DEFAULT_IMAGE_URL, DIRECTORY_STUDENT, ICON_DELETE, ICON_EDIT, ICON_RESTORE, TEXT_COLOR_DELETE, TEXT_COLOR_EDIT, TEXT_COLOR_RESTORE, TEXT_DELETE, TEXT_EDIT, TEXT_RESTORE } from "@/app/constants/constant";
import FooterTable from "@/app/components/table/footer-table";
import { showConfirmDeleteDialog, showConfirmRestoreDialog, showSuccessDialog } from "@/app/utils/sweet-alert";
import CustomTable from "@/app/components/table/custom-table";
import CustomDropdown from "@/app/components/dropdown/custom-dropdown";
import CustomDropdownItem from "@/app/components/dropdown/custom-dropdown-item";
import LoadingTable from "@/app/components/loading/loading-table";

export default function Student() {
  const [studentPages, setStudentPages] = useState<PageResponse<StudentResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchStudent = useCallback(async (): Promise<void> => {
    const buildSearchDto = (): SearchDto => {
      return {
        search: searchValue,
        page: currentPage,
        size: CONSTANT_PAGE_SIZE_VALUE,
      };
    };

    setIsLoading(true);
    const response = await studentFindAllPagination(buildSearchDto());
    setStudentPages(response);
    setIsLoading(false);
  }, [currentPage, searchValue]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleCreateStudent = (): void => {
    router.push(FE_STUDENT_CREATE);
  };

  const handleEditStudent = (id: number): void => {
    router.push(FE_STUDENT + "/" + id + "/update");
  };

  const handleDeleteStudent = async (id: number): Promise<void> => {
    try {
      const result = await showConfirmDeleteDialog();
      if (result.isConfirmed) {
        await studentDelete(id);
        showSuccessDialog();
        fetchStudent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreStudent = async (id: number): Promise<void> => {
    const result = await showConfirmRestoreDialog();
    if (result.isConfirmed) {
      await studentRestore(id);
      showSuccessDialog();
      fetchStudent();
    }
  };

  const headsTable = ["seq", "photo", "name", "email", "gender", "major", "education", ""];

  return (
    <div>
      <ContentTitle title="Student" />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <ContentSearch>
          <InputSearch onChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-end">
            <ButtonIcon onClick={() => handleCreateStudent()} type="button" icon="fa-solid fa-plus" text="Add Student" className="w-full md:w-auto" />
          </div>
        </ContentSearch>
        <CustomTable heads={headsTable}>
          {isLoading ? (
            <LoadingTable colSpan={headsTable.length} />
          ) : (
            studentPages?.content.map((student, index) => (
              <tr key={student.id} className={`${student.deleted ? "line-through text-red-500" : ""} border-b text-center`}>
                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                  {currentPage * CONSTANT_PAGE_SIZE_VALUE + index + 1}
                </td>
                <td scope="row" className="px-2.5 py-2 whitespace-nowrap flex justify-center w-20 xl:w-full">
                  <Image src={student.photo ? fileDownload(DIRECTORY_STUDENT, student.photo) : DEFAULT_IMAGE_URL} alt={student.name} width={250} height={250} priority className="w-16 h-16 rounded-lg border-4 border-gray-200 object-cover" />
                </td>
                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                  {student.name}
                </td>
                <td scope="row" className="px-2.5 py-2 break-words text-left whitespace-nowrap">
                  {student.email}
                </td>
                <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                  {student.gender.name}
                </td>
                <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                  {student.major}
                </td>
                <td scope="row" className="px-2.5 py-2 break-words whitespace-nowrap">
                  {student.education}
                </td>
                <td scope="row" className="px-2.5 py-2 whitespace-nowrap">
                  <CustomDropdown>
                    {student.deleted ? <CustomDropdownItem onClick={() => handleRestoreStudent(student.id)} className={TEXT_COLOR_RESTORE} icon={ICON_RESTORE} text={TEXT_RESTORE} /> : <CustomDropdownItem onClick={() => handleEditStudent(student.id)} className={TEXT_COLOR_EDIT} icon={ICON_EDIT} text={TEXT_EDIT} />}
                    <CustomDropdownItem onClick={() => handleDeleteStudent(student.id)} className={TEXT_COLOR_DELETE} icon={ICON_DELETE} text={TEXT_DELETE} />
                  </CustomDropdown>
                </td>
              </tr>
            ))
          )}
        </CustomTable>
        <FooterTable numberOfElements={studentPages?.numberOfElements ?? 0} totalElements={studentPages?.totalElements ?? 0} totalPages={studentPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
