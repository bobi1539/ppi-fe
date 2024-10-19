export interface UserRequest {
  username: string;
  name: string;
  email: string;
  isActive: boolean;
  photoBase64: string | null;
  photoFileName: string | null;
  description: string | null;
  userRoleId: number;
}
