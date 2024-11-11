"use client";

import { buildUserRoleRequest } from "./helper";
import { userRoleFindById, userRoleUpdate } from "@/app/backend-api/user-role";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";
import UserRoleModal from "./create-or-update";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";

interface UserRoleUpdateProps {
  id: number;
  closeModal: () => void;
  fetchUserRole: () => Promise<void>;
}

export default function UserRoleModalUpdate(props: Readonly<UserRoleUpdateProps>) {
  const [userRole, setUserRole] = useState<UserRoleResponse>();

  useEffect(() => {
    fetchUserRoleById();
  }, []);

  const fetchUserRoleById = async () => {
    const response = await userRoleFindById(props.id);
    setUserRole(response);
  };

  const submitUpdateUserRole = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = buildUserRoleRequest(formData);
    await userRoleUpdate(props.id, request);
    await showSuccessDialog();
    await props.fetchUserRole();
    props.closeModal();
  };

  return <UserRoleModal submit={submitUpdateUserRole} closeModal={props.closeModal} title="Edit User Role" userRole={userRole} />;
}
