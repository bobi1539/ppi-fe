import ButtonIcon from "@/app/components/button/button-icon";
import ButtonLoading from "@/app/components/button/button-loading";
import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import { useState } from "react";

interface ChangePasswordProps {
  userId: number;
  username: string;
  closeModal: () => void;
}

const PASSWORD: string = "password";
const PASSWORD_CONFIRM: string = "password-confirm";

export default function ChangePassword(props: Readonly<ChangePasswordProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const submitChangePassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      // e.preventDefault();
      // const formData = new FormData(e.currentTarget);
      // const request = await buildUserUpdateRequest(formData);
      // await userUpdate(userId, request);
      // await showSuccessDialog();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title={`Change Password ${props.username}`} closeModal={props.closeModal} className="w-full md:max-w-lg">
      <form onSubmit={submitChangePassword}>
        <div className="grid grid-cols-1 gap-3">
          <InputLabel value={password} onChange={(e) => setPassword(e.target.value)} label="Password" name={PASSWORD} type="password" placeHolder="Type password" isRequired={true} />
          <InputLabel value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} label="Password Confirm" name={PASSWORD} type="password" placeHolder="Type password confirm" isRequired={true} />
        </div>
        <div className="flex justify-end mt-4">{isLoading ? <ButtonLoading className="px-9" /> : <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />}</div>
      </form>
    </Modal>
  );
}
