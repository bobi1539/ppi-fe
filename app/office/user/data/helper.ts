import { Option } from "@/app/components/input/input-select";
import { UserCreateRequest } from "@/app/dto/request/user-create-request";
import { UserRoleResponse } from "@/app/dto/response/user-role-response";

export const USERNAME: string = "username";
export const NAME: string = "name";
export const EMAIL: string = "email";
export const IS_ACTIVE: string = "is-active";
export const PHOTO_BASE_64: string = "photo-base-64";
export const PHOTO_FILE_NAME: string = "photo-file-name";
export const DESCRIPTION: string = "description";
export const USER_ROLE_ID: string = "user=role-id";
export const PASSWORD: string = "password";
export const PASSWORD_CONFIRM: string = "password-confirm";

export const buildUserCreateRequest = (formData: FormData): UserCreateRequest => {
  console.log(String(formData.get(DESCRIPTION)).length);
  return {
    username: String(formData.get(USERNAME)),
    name: String(formData.get(NAME)),
    email: String(formData.get(EMAIL)),
    isActive: String(formData.get(IS_ACTIVE)) === "active",
    photoBase64: formData.get(PHOTO_BASE_64) === null ? null : String(formData.get(PHOTO_BASE_64)),
    photoFileName: formData.get(PHOTO_FILE_NAME) === null ? null : String(formData.get(PHOTO_FILE_NAME)),
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
