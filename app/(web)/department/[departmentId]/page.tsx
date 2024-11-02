"use client";

import { fileDownload } from "@/app/backend-api/file";
import { webStaffFindAll } from "@/app/backend-api/staff";
import Nl2Br from "@/app/components/paragraph/nl2br";
import DetailStaff from "@/app/components/staff/detail-staff";
import { DIRECTORY_STAFF } from "@/app/constants/constant";
import { DivisionResponse } from "@/app/dto/response/division-response";
import { StaffResponse } from "@/app/dto/response/staff-response";
import { StaffSearchDto } from "@/app/dto/search/staff-search-dto";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DepartmentDetailProps {
  params: {
    departmentId: number;
  };
}

export default function DepartmentDetail(props: Readonly<DepartmentDetailProps>) {
  const [heads, setHeads] = useState<StaffResponse[]>([]);
  const [teams, setTeams] = useState<StaffResponse[]>([]);
  const [division, setDivision] = useState<DivisionResponse>();

  useEffect(() => {
    fetchHead();
    fetchTeam();
  }, []);

  const fetchHead = async (): Promise<void> => {
    const response = await webStaffFindAll(buildSearchDto(true));
    setHeads(response);
    if (response && response.length > 0) {
      setDivision(response[0].division);
    }
  };

  const fetchTeam = async (): Promise<void> => {
    const response = await webStaffFindAll(buildSearchDto(false));
    setTeams(response);
  };

  const buildSearchDto = (isHead: boolean): StaffSearchDto => {
    return {
      search: "",
      divisionId: props.params.departmentId,
      isHead: isHead,
    };
  };

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl md:py-16 md:px-6">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl">{`${division?.name ?? ""} | ${division?.period.name ?? ""}`}</h2>
        </div>
        <div className="flex flex-col gap-6 mt-8 md:mt-12">
          {heads.map((head) => (
            <DetailStaff key={head.id} staff={head} />
          ))}
        </div>
        {teams && teams.length > 0 && (
          <div className="text-center text-gray-900">
            <h2 className="mb-4 mt-8 text-2xl tracking-tight font-extrabold text-gray-900 md:text-4xl">The Teams</h2>
          </div>
        )}
        <div className="p-4 flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
          {teams.map((team) => (
            <div key={team.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] flex flex-col items-center p-6 border border-gray-200 shadow rounded-lg relative cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-xl">
              <Image src={fileDownload(DIRECTORY_STAFF, team.photo)} alt={team.name} width={500} height={500} priority className="w-40 h-40 rounded-full border-4 border-gray-200 object-cover" />
              <h1 className="text-lg font-bold mt-2 text-center">{team.name}</h1>
              <h1 className="text-sm text-center">{team.position}</h1>
              <Nl2Br text={team.description} className="text-justify text-sm font-medium mt-2 p-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
