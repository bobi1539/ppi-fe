import Modal from "@/app/components/modal/modal";
import { buildPeriodRequest, COMMITTEE_NAME, END_DATE, START_DATE, STATUS, statusOptions } from "./helper";
import { periodCreate } from "@/app/backend-api/period";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import InputLabel from "@/app/components/input/input-label";
import ButtonIcon from "@/app/components/button/button-icon";
import InputSelect from "@/app/components/input/input-select";

interface CommitteeDataModalCreateProps {
  closeModal: () => void;
  fetchPeriod: () => Promise<void>;
}

export default function CommitteeDataModalCreate(props: Readonly<CommitteeDataModalCreateProps>) {
  const submitSavePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildPeriodRequest(formData);
    await periodCreate(request);
    await showSuccessDialog();
    await props.fetchPeriod();
    props.closeModal();
  };

  return (
    <Modal title="Add Committee Data" closeModal={props.closeModal} className="max-w-2xl">
      <form onSubmit={submitSavePeriod}>
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
            <InputLabel label="Committee Name" name={COMMITTEE_NAME} type="text" placeHolder="Type committee name" isRequired={true} />
            <InputSelect label="Status" name={STATUS} options={statusOptions} />
            <InputLabel label="Start" name={START_DATE} type="date" isRequired={true} />
            <InputLabel label="End" name={END_DATE} type="date" isRequired={true} />
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
