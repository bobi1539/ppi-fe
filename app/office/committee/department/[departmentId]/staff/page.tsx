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
import { staffDelete, staffFindAll, staffRestore } from "@/app/backend-api/staff";
import { StaffSearchDto } from "@/app/dto/search/staff-search-dto";
import CardStaffOffice from "@/app/components/card/card-staff-office";
import { showConfirmDialog, showSuccessDialog } from "@/app/utils/sweet-alert";

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
  const [staffIdHover, setStaffIdHover] = useState<number>(0);
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

  const handleClickStaff = (id: number): void => {
    setPopUpItemId(popUpItemId === id ? 0 : id);
    setStaffIdHover(staffIdHover === id ? 0 : id);
  };

  const handleEditStaff = (id: number): void => {
    // router.push(FE_EVENT + "/" + id + "/update");
  };

  const handleDeleteStaff = async (id: number): Promise<void> => {
    setStaffIdHover(id);
    try {
      const result = await showConfirmDialog("Are you sure to delete?");
      if (result.isConfirmed) {
        await staffDelete(id);
        await showSuccessDialog();
        await fetchStaffHead();
        await fetchStaffTeam();
      }
    } catch (error) {
      console.log(error);
    }
    setPopUpItemId(0);
    setStaffIdHover(0);
  };

  const handleRestoreStaff = async (id: number): Promise<void> => {
    setStaffIdHover(id);
    const result = await showConfirmDialog("Are you sure to restore?");
    if (result.isConfirmed) {
      await staffRestore(id);
      await showSuccessDialog();
      await fetchStaffHead();
      await fetchStaffTeam();
    }
    setPopUpItemId(0);
    setStaffIdHover(0);
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
          {staffHeads && staffHeads.length > 0 && (
            <div className="p-4 flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
              {staffHeads.map((head) => (
                <CardStaffOffice key={head.id} onClick={() => handleClickStaff(head.id)} staff={head} isShowBgGray={head.deleted || popUpItemId === head.id} isShowAction={popUpItemId === head.id} isScale={staffIdHover === head.id} handleEditStaff={() => handleEditStaff(head.id)} handleDeleteStaff={() => handleDeleteStaff(head.id)} handleRestoreStaff={() => handleRestoreStaff(head.id)} />
              ))}
            </div>
          )}
          {staffTeams && staffTeams.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-center">
                <h1 className="text-2xl font-bold">The Teams</h1>
              </div>
              <div className="p-4 flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
                {staffTeams.map((team) => (
                  <CardStaffOffice key={team.id} onClick={() => handleClickStaff(team.id)} staff={team} isShowBgGray={team.deleted || popUpItemId === team.id} isShowAction={popUpItemId === team.id} isScale={staffIdHover === team.id} handleEditStaff={() => handleEditStaff(team.id)} handleDeleteStaff={() => handleDeleteStaff(team.id)} handleRestoreStaff={() => handleRestoreStaff(team.id)} />
                ))}
              </div>
            </div>
          )}
          {isModalCreateOpen && <DepartmentStaffModalCreate closeModal={() => setIsModalCreateOpen(false)} fetchStaffHead={fetchStaffHead} fetchStaffTeam={fetchStaffTeam} divisionId={props.params.departmentId} />}
        </section>
      </div>
    </div>
  );
}
