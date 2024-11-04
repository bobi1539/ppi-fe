"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import ContentSearch from "../../components/content-search";
import ContentTitle from "../../components/content-title";
import InputSearch from "../../components/input-search";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FE_STUDENT_CREATE } from "@/app/constants/endpoint-fe";
import { PageResponse } from "@/app/dto/response/page-response";
import { StudentResponse } from "@/app/dto/response/student-response";

export default function Student() {
  const [studentPages, setStudentPages] = useState<PageResponse<StudentResponse>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateStudent = (): void => {
    router.push(FE_STUDENT_CREATE);
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
        
      </section>
    </div>
  );
}
