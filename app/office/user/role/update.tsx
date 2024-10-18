"use client";

import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import ButtonIcon from "@/app/components/button/button-icon";
import { buildUserRoleRequest, ROLE_NAME } from "./helper";
import { userRoleFindById, userRoleUpdate } from "@/app/backend-api/user-role";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";

interface UserRoleUpdateProps {
  id: number;
  closeModal: () => void;
  fetchUserRole: () => Promise<void>;
}

export default function UserRoleModalUpdate(props: Readonly<UserRoleUpdateProps>) {
  const [roleName, setRoleName] = useState<string>("");

  useEffect(() => {
    fetchUserRoleById();
  }, []);

  const fetchUserRoleById = async () => {
    const response = await userRoleFindById(props.id);
    setRoleName(response.name);
  };

  const submitUpdateUserRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildUserRoleRequest(formData);
    await userRoleUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchUserRole();
    props.closeModal();
  };

  return (
    <Modal title="Update User Role" closeModal={props.closeModal} className="max-w-lg">
      <form onSubmit={submitUpdateUserRole}>
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
