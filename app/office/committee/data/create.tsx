import Modal from "@/app/components/modal/modal";
import { buildPeriodRequest, COMMITTEE_NAME, END_DATE, START_DATE, STATUS } from "./helper";
import { periodCreate } from "@/app/backend-api/period";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import InputLabel from "@/app/components/input/input-label";
import ButtonIcon from "@/app/components/button/button-icon";

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
    <Modal title="Add Committee Data" closeModal={props.closeModal}>
      <form onSubmit={submitSavePeriod}>
        <div className="my-4">
          <InputLabel label="Committee Name" name={COMMITTEE_NAME} type="text" placeHolder="Type committee name" isRequired={true} />
          <InputLabel label="Start" name={START_DATE} type="date" placeHolder="" isRequired={true} />
          <InputLabel label="End" name={END_DATE} type="date" placeHolder="" isRequired={true} />
          <div className="mb-3">
            <label htmlFor="tes" className="block mb-1 text-sm font-medium text-gray-900">
              Status
            </label>
            <select name={STATUS} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-700 focus:border-secondary-700 block w-full p-2.5">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
