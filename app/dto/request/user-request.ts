export interface UserRequest {
  username: string;
  name: string;
  email: string;
  isActive: boolean;
  photoBase64: string;
  photoFileName: string;
  description: string;
  userRoleId: number;
}
