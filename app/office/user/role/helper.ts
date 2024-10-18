import { UserRoleRequest } from "@/app/dto/request/user-role-request";

export const ROLE_NAME: string = "role-name";

export const buildUserRoleRequest = (formData: FormData): UserRoleRequest => {
  return {
    name: String(formData.get(ROLE_NAME)),
  };
};
