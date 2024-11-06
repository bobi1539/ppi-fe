"use client";

import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import { useEffect, useState } from "react";
import { ROLE_NAME } from "./helper";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import ButtonSave from "@/app/components/button/button-save";

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
          <ButtonSave />
        </div>
      </form>
    </Modal>
  );
}
