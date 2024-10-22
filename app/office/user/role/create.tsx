"use client";

import { buildUserRoleRequest } from "./helper";
import { userRoleCreate } from "@/app/backend-api/user-role";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import UserRoleModal from "./create-or-update";
import { useState } from "react";

interface UserRoleCreateProps {
  closeModal: () => void;
  fetchUserRole: () => Promise<void>;
}

export default function UserRoleModalCreate(props: Readonly<UserRoleCreateProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitSaveUserRole = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildUserRoleRequest(formData);
    await userRoleCreate(request);
    await showSuccessDialog();
    await props.fetchUserRole();
    props.closeModal();
    setIsLoading(false);
  };

  return <UserRoleModal submit={submitSaveUserRole} closeModal={props.closeModal} title="Add User Role" isLoading={isLoading} setIsLoading={setIsLoading} />;
}
