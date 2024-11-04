import { Option } from "@/app/components/input/input-select-label";
import { StudentRequest } from "@/app/dto/request/student-request";
import { SystemParameterListResponse } from "@/app/dto/response/system-parameter-list-response";
import { getFileFormData } from "@/app/utils/helper";

export const PHOTO: string = "photo";
export const NAME: string = "name";
export const EMAIL: string = "email";
export const MAJOR: string = "major";
export const EDUCATION: string = "education";
export const GRADUATION: string = "graduation";
export const BIRTH_DATE: string = "birth-date";
export const GENDER_ID: string = "gender-id";

export const buildStudentRequest = async (formData: FormData): Promise<StudentRequest> => {
  const photo = await getFileFormData(formData, PHOTO);
  return {
    name: String(formData.get(NAME)),
    email: String(formData.get(EMAIL)),
    major: String(formData.get(MAJOR)),
    education: String(formData.get(EDUCATION)),
    graduation: String(formData.get(GRADUATION)).length === 0 ? null : String(formData.get(GRADUATION)),
    birthDate: String(formData.get(BIRTH_DATE)).length === 0 ? null : String(formData.get(BIRTH_DATE)),
    genderId: Number(formData.get(GENDER_ID)),
    photo: photo,
  };
};

export const getGenderOptions = (genders: SystemParameterListResponse[]): Option[] => {
  return genders.map((gender) => ({
    value: String(gender.id),
    label: gender.name,
  }));
};

export const getGenderOption = (gender: SystemParameterListResponse): Option => {
  return {
    value: String(gender.id),
    label: gender.name,
  };
};
