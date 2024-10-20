import { Option } from "@/app/components/input/input-select";
import { UserCreateRequest } from "@/app/dto/request/user-create-request";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";
import { convertFileToBase64 } from "@/app/utils/helper";

export const USERNAME: string = "username";
export const NAME: string = "name";
export const EMAIL: string = "email";
export const IS_ACTIVE: string = "is-active";
export const PHOTO: string = "photo";
export const DESCRIPTION: string = "description";
export const USER_ROLE_ID: string = "user=role-id";
export const PASSWORD: string = "password";
export const PASSWORD_CONFIRM: string = "password-confirm";

export const buildUserCreateRequest = async (formData: FormData): Promise<UserCreateRequest> => {
  const photo = formData.get(PHOTO) as File;
  let photoFileName = null;
  let photoBase64 = null;
  if (photo.name !== "") {
    photoFileName = photo.name;
    photoBase64 = await convertFileToBase64(photo);
  }
  return {
    username: String(formData.get(USERNAME)),
    name: String(formData.get(NAME)),
    email: String(formData.get(EMAIL)),
    isActive: String(formData.get(IS_ACTIVE)) === "active",
    photoBase64: photoBase64,
    photoFileName: photoFileName,
    description: String(formData.get(DESCRIPTION)).length === 0 ? null : String(formData.get(DESCRIPTION)),
    userRoleId: Number(formData.get(USER_ROLE_ID)),
    password: String(formData.get(PASSWORD)),
    passwordConfirm: String(formData.get(PASSWORD_CONFIRM)),
  };
};

export const getUserRoleOptions = (userRoles: UserRoleResponse[]): Option[] => {
  return userRoles.map((userRole) => ({
    value: String(userRole.id),
    label: userRole.name,
  }));
};
