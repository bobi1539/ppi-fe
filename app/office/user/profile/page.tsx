"use client";

import InputImage from "@/app/components/input/input-image";
import ContentTitle from "../../components/content-title";
import InputLabel from "@/app/components/input/input-label";
import TextArea from "@/app/components/input/text-area";
import ButtonIcon from "@/app/components/button/button-icon";
import { showSuccessDialog } from "@/app/utils/sweet-alert";
import { useEffect, useState } from "react";
import { DIRECTORY_USER, ICON_UNLOCK } from "@/app/constants/constant";
import { userFindByHeader, userUpdate } from "@/app/backend-api/user";
import { UserUpdateRequest } from "@/app/dto/request/user-update-request";
import { getFileFormData } from "@/app/utils/helper";
import ButtonLoading from "@/app/components/button/button-loading";
import ProfileChangePassword from "./profile-change-password";
import ButtonSave from "@/app/components/button/button-save";

const PHOTO: string = "photo";
const USERNAME: string = "username";
const NAME: string = "name";
const EMAIL: string = "email";
const DESCRIPTION: string = "description";

export default function UserProfile() {
  const [userId, setUserId] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [userRoleId, setUserRoleId] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async (): Promise<void> => {
    const response = await userFindByHeader();
    setUserId(response.id);
    setUsername(response.username);
    setName(response.name);
    setEmail(response.email);
    setDescription(response.description);
    setPhoto(response.photo);
    setUserRoleId(response.userRole.id);
    setIsActive(response.isActive);
  };

  const submitUpdateProfile = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const request = await buildUserUpdateRequest(formData);
      await userUpdate(userId, request);
      await showSuccessDialog();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buildUserUpdateRequest = async (formData: FormData): Promise<UserUpdateRequest> => {
    const photo = await getFileFormData(formData, PHOTO);
    return {
      username: String(formData.get(USERNAME)),
      name: String(formData.get(NAME)),
      email: String(formData.get(EMAIL)),
      description: String(formData.get(DESCRIPTION)).length === 0 ? null : String(formData.get(DESCRIPTION)),
      photo: photo,
      isActive: isActive,
      userRoleId: userRoleId,
    };
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-5xl">
        <div className="flex justify-between">
          <ContentTitle title="User Profile" />
        </div>
        <section className="bg-white shadow-md sm:rounded-lg overflow-hidden px-4 pb-5">
          <form onSubmit={submitUpdateProfile}>
            <div className="my-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="grid grid-cols-1 gap-3">
                  <InputImage directoryName={DIRECTORY_USER} currentImage={photo} inputName={PHOTO} classNameImagePreview="w-32 h-32 border border-gray-200 rounded-full object-cover" />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <InputLabel value={username} onChange={(e) => setUsername(e.target.value)} label="Username" name={USERNAME} type="text" placeHolder="Type username" isRequired={true} />
                  <InputLabel value={name} onChange={(e) => setName(e.target.value)} label="Name" name={NAME} type="text" placeHolder="Type name" isRequired={true} />
                  <InputLabel value={email} onChange={(e) => setEmail(e.target.value)} label="Email" name={EMAIL} type="email" placeHolder="Type email" isRequired={true} />
                  <TextArea label="Description" currentValue={description} onChange={(e) => setDescription(e.target.value)} name={DESCRIPTION} rows={5} isRequired={false} />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <ButtonIcon onClick={() => setIsModalChangePasswordOpen(!isModalChangePasswordOpen)} type="button" icon={ICON_UNLOCK} text="Change Password" className="w-auto px-5 py-2.5" color="bg-gray-500 hover:bg-gray-400" />
              {isLoading ? <ButtonLoading className="px-9" /> : <ButtonSave />}
            </div>
          </form>
          {isModalChangePasswordOpen && <ProfileChangePassword name={name} closeModal={() => setIsModalChangePasswordOpen(false)} />}
        </section>
      </div>
    </div>
  );
}
