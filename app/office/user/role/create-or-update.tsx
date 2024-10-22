"use client";

import ButtonIcon from "@/app/components/button/button-icon";
import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import { useEffect, useState } from "react";
import { ROLE_NAME } from "./helper";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";

interface UserRoleModalProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  closeModal: () => void;
  title: string;
  userRole?: UserRoleResponse;
}

export default function UserRoleModal(props: Readonly<UserRoleModalProps>) {
  const [roleName, setRoleName] = useState<string>("");

  useEffect(() => {
    if (props.userRole) {
      setRoleName(props.userRole.name);
    }
  }, [props.userRole]);

  return (
    <Modal title={props.title} closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={props.submit}>
        <div className="my-4">
          <InputLabel value={roleName} onChange={(e) => setRoleName(e.target.value)} label="Role Name" name={ROLE_NAME} type="text" placeHolder="Type role name" isRequired={true} />
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
