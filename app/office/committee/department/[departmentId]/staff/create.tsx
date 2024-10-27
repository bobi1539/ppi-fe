import { showSuccessDialog } from "@/app/utils/sweet-alert";
import DepartmentStaffModal from "./create-or-update";
import { buildStaffRequest } from "./helper";
import { staffCreate } from "@/app/backend-api/staff";

interface DepartmentStaffModalCreateProps {
  closeModal: () => void;
  fetchStaffHead: () => Promise<void>;
  fetchStaffTeam: () => Promise<void>;
  divisionId: number;
}

export default function DepartmentStaffModalCreate(props: Readonly<DepartmentStaffModalCreateProps>) {
  const submitSaveStaff = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildStaffRequest(formData, props.divisionId);
    await staffCreate(request);
    await showSuccessDialog();
    await props.fetchStaffHead();
    await props.fetchStaffTeam();
    props.closeModal();
  };

  return <DepartmentStaffModal submit={submitSaveStaff} closeModal={props.closeModal} title="Add Staff" />;
}
