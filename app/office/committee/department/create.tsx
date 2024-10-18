import Modal from "@/app/components/modal/modal";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import InputLabel from "@/app/components/input/input-label";
import ButtonIcon from "@/app/components/button/button-icon";
import { divisionCreate } from "@/app/backend-api/division";
import { buildDivisionRequest, DEPARTMENT_NAME } from "./helper";

interface CommitteeDepartmentModalCreateProps {
  closeModal: () => void;
  fetchDivision: () => Promise<void>;
}

export default function CommitteeDepartmentModalCreate(props: Readonly<CommitteeDepartmentModalCreateProps>) {
  const submitSavePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildDivisionRequest(formData);
    await divisionCreate(request);
    await showSuccessDialog();
    await props.fetchDivision();
    props.closeModal();
  };

  return (
    <Modal title="Add Committee Department" closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={submitSavePeriod}>
        <div className="my-4">
          <div className="grid grid-cols-1 gap-3">
            <InputLabel label="Department Name" name={DEPARTMENT_NAME} type="text" placeHolder="Type department name" isRequired={true} />
            <InputLabel label="Department Name" name={DEPARTMENT_NAME} type="text" placeHolder="Type department name" isRequired={true} />
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
