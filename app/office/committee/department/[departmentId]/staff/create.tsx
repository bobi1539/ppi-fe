import { showSuccessDialog } from "@/app/utils/sweet-alert";
import DepartmentStaffModal from "./create-or-update";
import { buildStaffRequest } from "./helper";
import { staffCreate } from "@/app/backend-api/staff";
import { useState } from "react";

interface DepartmentStaffModalCreateProps {
  closeModal: () => void;
  fetchStaffHead: () => Promise<void>;
  fetchStaffTeam: () => Promise<void>;
  divisionId: number;
}

export default function DepartmentStaffModalCreate(props: Readonly<DepartmentStaffModalCreateProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitSaveStaff = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildStaffRequest(formData, props.divisionId);
      await staffCreate(request);
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

  return <DepartmentStaffModal isLoading={isLoading} submit={submitSaveStaff} closeModal={props.closeModal} title="Add Staff" />;
}
