import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import ButtonIcon from "@/app/components/button/button-icon";
import { buildUserRoleRequest, ROLE_NAME } from "./helper";
import { userRoleCreate } from "@/app/backend-api/user-role";
import { showSuccessDialog } from "@/app/utils/sweet-alert";

interface UserRoleCreateProps {
  closeModal: () => void;
  fetchUserRole: () => Promise<void>;
}

export default function UserRoleModalCreate(props: Readonly<UserRoleCreateProps>) {
  const submitSaveUserRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildUserRoleRequest(formData);
    await userRoleCreate(request);
    await showSuccessDialog();
    await props.fetchUserRole();
    props.closeModal();
  };

  return (
    <Modal title="Add User Role" closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={submitSaveUserRole}>
        <div className="my-4">
          <InputLabel label="Role Name" name={ROLE_NAME} type="text" placeHolder="Type role name" isRequired={true} />
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
