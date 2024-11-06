import { showSuccessDialog } from "@/app/utils/sweet-alert";
import ModalChangePassword, { PASSWORD, PASSWORD_CONFIRM } from "../modal-change-password";
import { ChangePasswordRequest } from "@/app/dto/request/change-password-request";
import { userChangePasswordById } from "@/app/backend-api/user";

interface UserChangePasswordProps {
  userId: number;
  username: string;
  closeModal: () => void;
}

export default function UserChangePassword(props: Readonly<UserChangePasswordProps>) {
  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildChangePasswordRequest(formData);
    await userChangePasswordById(props.userId, request);
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
