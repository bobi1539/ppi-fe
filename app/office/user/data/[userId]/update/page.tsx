"use client";

import InputLabel from "@/app/components/input/input-label";
import ButtonIcon from "@/app/components/button/button-icon";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { userFindById, userUpdate } from "@/app/backend-api/user";
import { buildUserUpdateRequest, DESCRIPTION, EMAIL, getUserRoleOption, getUserRoleOptions, IS_ACTIVE, NAME, PHOTO, USER_ROLE_ID, USERNAME } from "./../../helper";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import { getStatusOption, statusOptions } from "../../../../committee/data/helper";
import { useEffect, useState } from "react";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import { userRoleFindAll } from "@/app/backend-api/user-role";
import ContentTitle from "@/app/office/components/content-title";
import Link from "next/link";
import { FE_USER_DATA } from "@/app/constants/endpoint-fe";
import { useRouter } from "next/navigation";
import InputImage from "@/app/components/input/input-image";
import { DIRECTORY_USER } from "@/app/constants/constant";

export default function UserDataUpdate({ params }: Readonly<{ params: { userId: number } }>) {
  const router = useRouter();
  const [userRoles, setUserRoles] = useState<UserRoleResponse[]>([]);
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userRoleOption, setUserRoleOption] = useState<Option>();
  const [isActiveOption, setIsActiveOption] = useState<Option>();
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    fetchUserById();
    fetchUserRole();
  }, []);

  useEffect(() => {}, [photo]);

  const fetchUserRole = async (): Promise<void> => {
    const response = await userRoleFindAll({ search: "", isDeleted: false });
    setUserRoles(response);
  };

  const fetchUserById = async (): Promise<void> => {
    const response = await userFindById(params.userId);
    setUsername(response.username);
    setName(response.name);
    setEmail(response.email);
    setUserRoleOption(getUserRoleOption(response.userRole));
    setIsActiveOption(getStatusOption(response.isActive));
    setDescription(response.description);
    setPhoto(response.photo);
  };

  const submitUpdateUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = await buildUserUpdateRequest(formData);
    await userUpdate(params.userId, request);
    await showSuccessDialog();
    router.push(FE_USER_DATA);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <div className="flex justify-between">
          <ContentTitle title="Edit User Data" />
        </div>
        <section className="bg-white shadow-md sm:rounded-lg overflow-hidden p-5">
          <form onSubmit={submitUpdateUser}>
            <div className="my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputLabel value={username} onChange={(e) => setUsername(e.target.value)} label="Username" name={USERNAME} type="text" placeHolder="Type username" isRequired={true} />
                  <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                  <InputLabel value={email} onChange={(e) => setEmail(e.target.value)} label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
                  <InputSelectLabel label="Role" name={USER_ROLE_ID} option={userRoleOption} options={getUserRoleOptions(userRoles)} />
                  <InputSelectLabel label="Status" name={IS_ACTIVE} option={isActiveOption} options={statusOptions} />
                  <InputLabel value={description} onChange={(e) => setDescription(e.target.value)} label="Description" name={DESCRIPTION} type="text" placeHolder="Type Description" isRequired={false} />
                </div>
                <InputImage directoryName={DIRECTORY_USER} currentImage={photo} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full" />
              </div>
            </div>
            <div className="flex justify-between">
              <Link href={FE_USER_DATA}>
                <ButtonIcon type="button" icon="fa-solid fa-arrow-left" text="Back" className="w-auto px-5 py-2.5" color="bg-gray-500 hover:bg-gray-400" />
              </Link>
              <ButtonIcon type="submit" icon="fa-solid fa-floppy-disk" text="Save" className="w-auto px-5 py-2.5" />
            </div>
          </form>
          <div className="bg-white h-48"></div>
        </section>
      </div>
    </div>
  );
}
