"use client";

import InputLabel from "@/app/components/input/input-label";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { userCreate } from "@/app/backend-api/user";
import { buildUserCreateRequest, DESCRIPTION, EMAIL, getUserRoleOptions, IS_ACTIVE, NAME, PASSWORD, PASSWORD_CONFIRM, PHOTO, USER_ROLE_ID, USERNAME } from "./../helper";
import InputSelectLabel from "@/app/components/input/input-select-label";
import { statusOptions } from "../../../committee/data/helper";
import { useEffect, useState } from "react";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import { userRoleFindAll } from "@/app/backend-api/user-role";
import ContentTitle from "@/app/office/components/content-title";
import { FE_USER_DATA } from "@/app/constants/endpoint-fe";
import { useRouter } from "next/navigation";
import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_USER } from "@/app/constants/constant";
import ButtonBack from "@/app/components/button/button-back";
import TextArea from "@/app/components/input/text-area";
import ButtonSave from "@/app/components/button/button-save";

export default function UserDataCreate() {
  const [userRoles, setUserRoles] = useState<UserRoleResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    const response = await userRoleFindAll({ search: "", isDeleted: false });
    setUserRoles(response);
  };

  const submitSaveUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildUserCreateRequest(formData);
    await userCreate(request);
    await showSuccessDialog();
    router.push(FE_USER_DATA);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <div className="flex justify-between">
          <ContentTitle title="Add User Data" />
        </div>
        <section className="bg-white relative shadow-md rounded-lg overflow-hidden p-5">
          <form onSubmit={submitSaveUser}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
              <div className="grid grid-cols-1 gap-3">
                <InputImage directoryName={DIRECTORY_USER} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
                <InputLabel className="mt-3" label="Username" name={USERNAME} type="text" placeHolder="Type username" isRequired={true} />
                <InputLabel label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                <InputLabel label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <InputSelectLabel label="Role" name={USER_ROLE_ID} options={getUserRoleOptions(userRoles)} required />
                <InputLabel label="Password" name={PASSWORD} type="password" placeHolder="Type Password" isRequired={true} />
                <InputLabel label="Password Confirm" name={PASSWORD_CONFIRM} type="password" placeHolder="Type Password Confirm" isRequired={true} />
                <InputSelectLabel label="Status" name={IS_ACTIVE} options={statusOptions} required />
                <TextArea label="Description" name={DESCRIPTION} rows={5} isRequired={false} />
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_USER_DATA} />
              <ButtonSave />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
