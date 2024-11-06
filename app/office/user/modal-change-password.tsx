import ButtonLoading from "@/app/components/button/button-loading";
import ButtonSave from "@/app/components/button/button-save";
import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import { useState } from "react";

interface ChangePasswordProps {
  isLoading: boolean;
  name: string;
  closeModal: () => void;
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const PASSWORD: string = "password";
export const PASSWORD_CONFIRM: string = "password-confirm";

export default function ModalChangePassword(props: Readonly<ChangePasswordProps>) {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  return (
    <Modal title={`Change Password : ${props.name}`} closeModal={props.closeModal} className="w-full md:max-w-lg">
      <form onSubmit={props.submit}>
        <div className="grid grid-cols-1 gap-3">
          <InputLabel value={password} onChange={(e) => setPassword(e.target.value)} label="Password" name={PASSWORD} type="password" placeHolder="Type password" isRequired={true} />
          <InputLabel value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} label="Password Confirm" name={PASSWORD_CONFIRM} type="password" placeHolder="Type password confirm" isRequired={true} />
        </div>
        <div className="flex justify-end mt-4">{props.isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}</div>
      </form>
    </Modal>
  );
}
