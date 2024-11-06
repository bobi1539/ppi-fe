import { ChangePasswordRequest } from "@/app/dto/request/change-password-request";
import ModalChangePassword, { PASSWORD, PASSWORD_CONFIRM } from "../modal-change-password";
import { userChangePasswordByHeader } from "@/app/backend-api/user";
import { showSuccessDialog } from "@/app/utils/sweet-alert";

interface ProfileChangePasswordProps {
  username: string;
  closeModal: () => void;
}

export default function ProfileChangePassword(props: Readonly<ProfileChangePasswordProps>) {
  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildChangePasswordRequest(formData);
    await userChangePasswordByHeader(request);
    await showSuccessDialog();
    props.closeModal();
  };

  const buildChangePasswordRequest = (formData: FormData): ChangePasswordRequest => {
    return {
      password: String(formData.get(PASSWORD)),
      passwordConfirm: String(formData.get(PASSWORD_CONFIRM)),
    };
  };

  return <ModalChangePassword username={props.username} closeModal={props.closeModal} submit={submitChangePassword} />;
}
