"use client";

import InputLabel from "@/app/components/input/input-label";
import Modal from "@/app/components/modal/modal";
import ButtonIcon from "@/app/components/button/button-icon";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { userCreate } from "@/app/backend-api/user";
import { buildUserCreateRequest, DESCRIPTION, EMAIL, getUserRoleOptions, IS_ACTIVE, NAME, PASSWORD, PASSWORD_CONFIRM, USER_ROLE_ID, USERNAME } from "./helper";
import InputSelect from "@/app/components/input/input-select";
import { statusOptions } from "../../committee/data/helper";
import { useEffect, useState } from "react";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import { userRoleFindAll } from "@/app/backend-api/user-role";

interface UserModalCreate {
  closeModal: () => void;
  fetchUser: () => Promise<void>;
}

export default function UserModalCreate(props: Readonly<UserModalCreate>) {
  const [userRoles, setUserRoles] = useState<UserRoleResponse[]>([]);

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    const response = await userRoleFindAll({ search: "", isDeleted: false });
    setUserRoles(response);
  };

  const submitSaveUserRole = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildUserCreateRequest(formData);
    await userCreate(request);
    await showSuccessDialog();
    await props.fetchUser();
    props.closeModal();
  };

  return (
    <Modal title="Add User" closeModal={props.closeModal} className="max-w-3xl">
      <form onSubmit={submitSaveUserRole}>
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputLabel label="Username" name={USERNAME} type="text" placeHolder="Type username" isRequired={true} />
            <InputLabel label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
            <InputLabel label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
            <InputSelect label="Status" name={IS_ACTIVE} options={statusOptions} />
            <InputSelect label="Role" name={USER_ROLE_ID} options={getUserRoleOptions(userRoles)} />
            <InputLabel label="Description" name={DESCRIPTION} type="text" placeHolder="Type Description" isRequired={false} />
            <InputLabel label="Password" name={PASSWORD} type="password" placeHolder="Type Password" isRequired={true} />
            <InputLabel label="Password Confirm" name={PASSWORD_CONFIRM} type="password" placeHolder="Type New Password" isRequired={true} />
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
        </div>
      </form>
    </Modal>
  );
}
