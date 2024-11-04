"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../../components/content-search";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FE_STUDENT, FE_STUDENT_CREATE } from "@/app/constants/endpoint-fe";
import { PageResponse } from "@/app/dto/response/page-response";
import { StudentResponse } from "@/app/dto/response/student-response";
import LoadingOffice from "../../loading";
import { studentDelete, studentFindAllPagination, studentRestore } from "@/app/backend-api/student";
import { SearchDto } from "@/app/dto/search/search-dto";
import Image from "next/image";
import { fileDownload } from "@/app/backend-api/file";
import { DEFAULT_IMAGE_URL, DIRECTORY_STUDENT } from "@/app/constants/constant";
import FooterTable from "@/app/components/table/footer-table";
import ActionCard from "../../components/action-card";
import { showConfirmDeleteDialog, showConfirmRestoreDialog, showSuccessDialog } from "@/app/utils/sweet-alert";

export default function Student() {
  const [studentPages, setStudentPages] = useState<PageResponse<StudentResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popUpItemId, setPopUpItemId] = useState<number>(0);
  const [studentIdHover, setStudentIdHover] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    fetchStudent();
  }, [currentPage, searchValue]);

  const fetchStudent = async (): Promise<void> => {
    setIsLoading(true);
    const response = await studentFindAllPagination(buildSearchDto());
    setStudentPages(response);
    setIsLoading(false);
  };

  const buildSearchDto = (): SearchDto => {
    return {
      search: searchValue,
      page: currentPage,
      size: 15,
    };
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page - 1);
  };

  const handleClickStudent = (id: number): void => {
    setPopUpItemId(popUpItemId === id ? 0 : id);
    setStudentIdHover(studentIdHover === id ? 0 : id);
  };

  const handleCreateStudent = (): void => {
    router.push(FE_STUDENT_CREATE);
  };

  const handleEditStudent = (id: number): void => {
    router.push(FE_STUDENT + "/" + id + "/update");
  };

  const handleDeleteStudent = async (id: number): Promise<void> => {
    setStudentIdHover(id);
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
    setPopUpItemId(0);
    setStudentIdHover(0);
  };

  const handleRestoreStudent = async (id: number): Promise<void> => {
    setStudentIdHover(id);
    const result = await showConfirmRestoreDialog();
    if (result.isConfirmed) {
      await studentRestore(id);
      showSuccessDialog();
      fetchStudent();
    }
    setPopUpItemId(0);
    setStudentIdHover(0);
  };

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
        {isLoading ? (
          <LoadingOffice />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 pt-2">
            {studentPages?.content.map((student) => (
              <div key={student.id} onClick={() => handleClickStudent(student.id)} className={`${popUpItemId === student.id ? "scale-110 shadow-2xl" : ""} w-full flex flex-col bg-white items-center p-4 py-12 border border-gray-200 shadow rounded-lg relative cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-xl`}>
                {(student.deleted || popUpItemId === student.id) && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer top-0 left-0" />}
                <Image src={student.photo ? fileDownload(DIRECTORY_STUDENT, student.photo) : DEFAULT_IMAGE_URL} alt={student.name} width={500} height={500} priority className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover" />
                <h1 className={`text-lg font-bold mt-2 text-center ${student.deleted ? "line-through text-red-500" : ""}`}>{student.name}</h1>
                <h1 className="text-sm text-center">{student.major}</h1>
                {popUpItemId === student.id && <ActionCard deleted={student.deleted ?? false} handleEdit={() => handleEditStudent(student.id)} handleDelete={() => handleDeleteStudent(student.id)} handleRestore={() => handleRestoreStudent(student.id)} />}
              </div>
            ))}
          </div>
        )}
        <FooterTable numberOfElements={studentPages?.numberOfElements ?? 0} totalElements={studentPages?.totalElements ?? 0} totalPages={studentPages?.totalPages ?? 10} handlePageChange={handlePageChange} />
      </section>
    </div>
  );
}
