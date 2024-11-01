"use client";

import { periodFindById } from "@/app/backend-api/period";
import { staffFindByPeriodId } from "@/app/backend-api/staff";
import ButtonBack from "@/app/components/button/button-back";
import CardStaffPeriod from "@/app/components/card/card-staff-period";
import { FE_COMMITTEE_DATA } from "@/app/constants/endpoint-fe";
import { PeriodResponse } from "@/app/dto/response/period-response";
import { StaffDivisionResponse } from "@/app/dto/response/staff-division-response";
import { StaffResponse } from "@/app/dto/response/staff-response";
import ContentTitle from "@/app/office/components/content-title";
import React, { useEffect, useState } from "react";
import StaffDetailModal from "./detail";

interface CommitteeStaffProps {
  params: {
    periodId: number;
  };
}

export default function CommitteeStaff(props: Readonly<CommitteeStaffProps>) {
  const [period, setPeriod] = useState<PeriodResponse>();
  const [staffs, setStaffs] = useState<StaffDivisionResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [staffClick, setStaffClick] = useState<StaffResponse>();

  useEffect(() => {
    fetchPeriodById();
    fetchStaff();
  }, []);

  const fetchPeriodById = async (): Promise<void> => {
    const response = await periodFindById(props.params.periodId);
    setPeriod(response);
  };

  const fetchStaff = async (): Promise<void> => {
    const response = await staffFindByPeriodId(props.params.periodId);
    setStaffs(response);
  };

  const handleClickCardStaff = (staff: StaffResponse): void => {
    setIsModalOpen(!isModalOpen);
    setStaffClick(staff);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <div className="flex justify-between">
          <ContentTitle title={period?.name ?? ""} />
          <ButtonBack href={FE_COMMITTEE_DATA} />
        </div>
        <section className="bg-white relative shadow-md sm:rounded-lg overflow-hidden pb-5">
          <div className="px-4 divide-y-4 divide-gray-200 divide-dashed">
            {staffs.map((staff) => (
              <div key={staff.id}>
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4 p-4">
                  {staff.heads.map((head) => (
                    <CardStaffPeriod onClick={() => handleClickCardStaff(head)} key={head.id} staff={head} />
                  ))}
                </div>
                {staff.teams.length > 0 && (
                  <>
                    <div className="flex justify-center">
                      <h1 className="font-bold text-2xl text-gray-900">Teams</h1>
                    </div>
                    <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4 p-4">
                      {staff.teams.map((team) => (
                        <CardStaffPeriod onClick={() => handleClickCardStaff(team)} key={team.id} staff={team} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
        {isModalOpen && <StaffDetailModal staff={staffClick} closeModal={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}
