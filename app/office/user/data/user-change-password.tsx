import { showSuccessDialog } from "@/app/utils/sweet-alert";
import ModalChangePassword, { PASSWORD, PASSWORD_CONFIRM } from "../modal-change-password";
import { ChangePasswordRequest } from "@/app/dto/request/change-password-request";
import { userChangePasswordById } from "@/app/backend-api/user";
import { useState } from "react";

interface UserChangePasswordProps {
  userId: number;
  name: string;
  closeModal: () => void;
}

export default function UserChangePassword(props: Readonly<UserChangePasswordProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = buildChangePasswordRequest(formData);
      await userChangePasswordById(props.userId, request);
      await showSuccessDialog();
      props.closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildChangePasswordRequest = (formData: FormData): ChangePasswordRequest => {
    return {
      password: String(formData.get(PASSWORD)),
      passwordConfirm: String(formData.get(PASSWORD_CONFIRM)),
    };
  };
  return <ModalChangePassword isLoading={isLoading} name={props.name} closeModal={props.closeModal} submit={submitChangePassword} />;
}
