import { ChangePasswordRequest } from "@/app/dto/request/change-password-request";
import ModalChangePassword, { PASSWORD, PASSWORD_CONFIRM } from "../modal-change-password";
import { userChangePasswordByHeader } from "@/app/backend-api/user";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useState } from "react";

interface ProfileChangePasswordProps {
  name: string;
  closeModal: () => void;
}

export default function ProfileChangePassword(props: Readonly<ProfileChangePasswordProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = buildChangePasswordRequest(formData);
      await userChangePasswordByHeader(request);
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

  return <ModalChangePassword name={props.name} closeModal={props.closeModal} submit={submitChangePassword} isLoading={isLoading} />;
}
