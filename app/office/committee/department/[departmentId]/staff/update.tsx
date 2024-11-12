"use client";

import { showSuccessDialog } from "@/app/utils/sweet-alert";
import DepartmentStaffModal from "./create-or-update";
import { buildStaffRequest } from "./helper";
import { staffFindById, staffUpdate } from "@/app/backend-api/staff";
import { useEffect, useState } from "react";
import { StaffResponse } from "@/app/dto/response/staff-response";

interface DepartmentStaffModalUpdateProps {
  id: number;
  closeModal: () => void;
  fetchStaffHead: () => Promise<void>;
  fetchStaffTeam: () => Promise<void>;
}

export default function DepartmentStaffModalUpdate(props: Readonly<DepartmentStaffModalUpdateProps>) {
  const [staff, setStaff] = useState<StaffResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStaffById = async (): Promise<void> => {
      const response = await staffFindById(props.id);
      setStaff(response);
    };

    fetchStaffById();
  }, [props.id]);
  
  const submitUpdateStaff = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildStaffRequest(formData, staff?.division.id ?? 0, staff?.photo);
      await staffUpdate(props.id, request);
      await showSuccessDialog();
      await props.fetchStaffHead();
      await props.fetchStaffTeam();
      props.closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <DepartmentStaffModal isLoading={isLoading} submit={submitUpdateStaff} closeModal={props.closeModal} title="Edit Staff" staff={staff} />;
}
