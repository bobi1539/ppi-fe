"use client";

import InputLabel from "@/app/components/input/input-label";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { userFindById, userUpdate } from "@/app/backend-api/user";
import { buildUserUpdateRequest, DESCRIPTION, EMAIL, getUserRoleOption, getUserRoleOptions, IS_ACTIVE, NAME, PHOTO, USER_ROLE_ID, USERNAME } from "./../../helper";
import InputSelectLabel, { Option } from "@/app/components/input/input-select-label";
import { getStatusOption, statusOptions } from "../../../../committee/data/helper";
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
import ButtonLoading from "@/app/components/button/button-loading";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildUserUpdateRequest(formData);
      await userUpdate(params.userId, request);
      await showSuccessDialog();
      router.push(FE_USER_DATA);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="grid grid-cols-1 gap-3">
                  <InputImage directoryName={DIRECTORY_USER} currentImage={photo} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
                  <InputLabel className="mt-3" value={username} onChange={(e) => setUsername(e.target.value)} label="Username" name={USERNAME} type="text" placeHolder="Type username" isRequired={true} />
                  <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <InputLabel value={email} onChange={(e) => setEmail(e.target.value)} label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
                  <InputSelectLabel label="Role" name={USER_ROLE_ID} option={userRoleOption} options={getUserRoleOptions(userRoles)} required />
                  <InputSelectLabel label="Status" name={IS_ACTIVE} option={isActiveOption} options={statusOptions} required />
                  <TextArea label="Description" currentValue={description} onChange={(e) => setDescription(e.target.value)} name={DESCRIPTION} rows={5} isRequired={false} />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonBack href={FE_USER_DATA} />
              {isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
