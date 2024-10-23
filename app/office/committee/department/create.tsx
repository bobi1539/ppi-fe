import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { divisionCreate } from "@/app/backend-api/division";
import { buildDivisionRequest } from "./helper";
import CommitteeDepartmentModal from "./create-or-update";

interface CommitteeDepartmentModalCreateProps {
  closeModal: () => void;
  fetchDivision: () => Promise<void>;
}

export default function CommitteeDepartmentModalCreate(props: Readonly<CommitteeDepartmentModalCreateProps>) {
  const submitSavePeriod = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildDivisionRequest(formData);
    console.log(request);
    await divisionCreate(request);
    await showSuccessDialog();
    await props.fetchDivision();
    props.closeModal();
  };

  return <CommitteeDepartmentModal submit={submitSavePeriod} closeModal={props.closeModal} title="Add Committee Department" />;
}
