"use client";

import { divisionFindById } from "@/app/backend-api/division";
import ButtonBack from "@/app/components/button/button-back";
import ButtonIcon from "@/app/components/button/button-icon";
import { FE_DEPARTMENT } from "@/app/constants/endpoint-fe";
import { DivisionResponse } from "@/app/dto/response/division-response";
import ContentTitle from "@/app/office/components/content-title";
import { useEffect, useState } from "react";
import DepartmentStaffModalCreate from "./create";
import { StaffResponse } from "@/app/dto/response/staff-response";
import { staffFindAll } from "@/app/backend-api/staff";
import { StaffSearchDto } from "@/app/dto/search/staff-search-dto";
import Image from "next/image";
import { imageDownload } from "@/app/backend-api/file";
import { DIRECTORY_STAFF, ICON_DELETE, ICON_EDIT, TEXT_DELETE, TEXT_EDIT } from "@/app/constants/constant";
import Nl2Br from "@/app/components/paragraph/nl2br";
import ActionCard from "@/app/office/components/action-card";

interface DepartmentStaffProps {
  params: {
    departmentId: number;
  };
}

export default function DepartmentStaff(props: Readonly<DepartmentStaffProps>) {
  const [staffHeads, setStaffHeads] = useState<StaffResponse[]>([]);
  const [staffTeams, setStaffTeams] = useState<StaffResponse[]>([]);
  const [division, setDivision] = useState<DivisionResponse>();
  const [popUpItemId, setPopUpItemId] = useState<number>(0);
  const [eventIdHover, setEventIdHover] = useState<number>(0);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchDivisionById();
    fetchStaffHead();
    fetchStaffTeam();
  }, []);

  const fetchDivisionById = async (): Promise<void> => {
    const response = await divisionFindById(props.params.departmentId);
    setDivision(response);
  };

  const fetchStaffHead = async (): Promise<void> => {
    const response = await staffFindAll(buildSearchDto(true));
    console.log(response);
    setStaffHeads(response);
  };

  const fetchStaffTeam = async (): Promise<void> => {
    const response = await staffFindAll(buildSearchDto(false));
    setStaffTeams(response);
  };

  const buildSearchDto = (isHead: boolean): StaffSearchDto => {
    return {
      search: "",
      divisionId: props.params.departmentId,
      isHead: isHead,
    };
  };

  const handleClickEvent = (id: number): void => {
    setPopUpItemId(popUpItemId === id ? 0 : id);
    setEventIdHover(eventIdHover === id ? 0 : id);
  };

  const handleEditEvent = (id: number): void => {
    // router.push(FE_EVENT + "/" + id + "/update");
  };

  const handleDeleteEvent = async (id: number): Promise<void> => {
    setEventIdHover(id);
    // try {
    //   const result = await showConfirmDialog("Are you sure to delete?");
    //   if (result.isConfirmed) {
    //     await eventDelete(id);
    //     showSuccessDialog();
    //     fetchEvent();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setPopUpItemId(0);
    setEventIdHover(0);
  };

  const handleRestoreEvent = async (id: number): Promise<void> => {
    setEventIdHover(id);
    // const result = await showConfirmDialog("Are you sure to restore?");
    // if (result.isConfirmed) {
    //   await eventRestore(id);
    //   showSuccessDialog();
    //   fetchEvent();
    // }
    setPopUpItemId(0);
    setEventIdHover(0);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <ContentTitle title={`${division?.name} | ${division?.period.name} `} />
        <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
          <div className="flex justify-between p-4">
            <ButtonBack href={FE_DEPARTMENT} />
            <ButtonIcon onClick={() => setIsModalCreateOpen(!isModalCreateOpen)} type="button" icon="fa-solid fa-plus" text="Add Staff" className="w-auto" />
          </div>
          <div className="p-4 flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
            {staffHeads.map((head) => (
              <div key={head.id} onClick={() => handleClickEvent(head.id)} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] flex flex-col items-center p-6 border border-gray-200 shadow rounded-lg relative cursor-pointer">
                {(head.deleted || popUpItemId === head.id) && <div className="bg-gray-400/50 w-full h-full absolute rounded-lg cursor-pointer top-0 left-0" />}
                <Image src={imageDownload(DIRECTORY_STAFF, head.photo)} alt={head.name} width={500} height={500} priority className="w-40 h-40 rounded-full border-4 border-gray-200" />
                <h1 className="text-lg font-bold mt-2">{head.name}</h1>
                <h1 className="text-sm">{head.position}</h1>
                <Nl2Br text={head.description} className="text-center text-sm font-medium mt-2" />
                {popUpItemId === head.id && <ActionCard deleted={head.deleted ?? false} handleEdit={() => handleEditEvent(head.id)} handleDelete={() => handleDeleteEvent(head.id)} handleRestore={() => handleRestoreEvent(head.id)} />}
              </div>
            ))}
          </div>
          {isModalCreateOpen && <DepartmentStaffModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchStaffHead={fetchStaffHead} fetchStaffTeam={fetchStaffTeam} divisionId={props.params.departmentId} />}
        </section>
      </div>
    </div>
  );
}
