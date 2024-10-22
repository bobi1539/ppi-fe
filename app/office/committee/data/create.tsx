import { buildPeriodRequest } from "./helper";
import { periodCreate } from "@/app/backend-api/period";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import CommitteeDataModal from "./create-or-update";

interface CommitteeDataModalCreateProps {
  closeModal: () => void;
  fetchPeriod: () => Promise<void>;
}

export default function CommitteeDataModalCreate(props: Readonly<CommitteeDataModalCreateProps>) {
  const submitSavePeriod = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildPeriodRequest(formData);
    await periodCreate(request);
    await showSuccessDialog();
    await props.fetchPeriod();
    props.closeModal();
  };

  return <CommitteeDataModal submit={submitSavePeriod} closeModal={props.closeModal} title="Add Committee Data" />;
}
