"use client";

import { divisionFindById } from "@/app/backend-api/division";
import ButtonBack from "@/app/components/button/button-back";
import ButtonIcon from "@/app/components/button/button-icon";
import { FE_DEPARTMENT } from "@/app/constants/endpoint-fe";
import { DivisionResponse } from "@/app/dto/response/division-response";
import ContentTitle from "@/app/office/components/content-title";
import { useEffect, useState } from "react";
import DepartmentStaffModalCreate from "./create";

interface DepartmentStaffProps {
  params: {
    departmentId: number;
  };
}

export default function DepartmentStaff(props: Readonly<DepartmentStaffProps>) {
  const [division, setDivision] = useState<DivisionResponse>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchDivisionById();
  }, []);

  const fetchDivisionById = async (): Promise<void> => {
    const response = await divisionFindById(props.params.departmentId);
    setDivision(response);
  };

  const fetchStaffByDivision = async (): Promise<void> => {};

  return (
    <div>
      <ContentTitle title={`${division?.name} | ${division?.period.name} `} />
      <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
        <div className="flex justify-between p-4">
          <ButtonBack href={FE_DEPARTMENT} />
          <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add Staff" className="w-auto" />
        </div>
        {isModalCreateOpen && <DepartmentStaffModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchStaffByDivision={fetchStaffByDivision} divisionId={props.params.departmentId} />}
      </section>
    </div>
  );
}
