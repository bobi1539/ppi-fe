import { StudentRequest } from "@/app/dto/request/student-request";
import { getFileFormData } from "@/app/utils/helper";

export const PHOTO: string = "photo";
export const NAME: string = "name";
export const NICKNAME: string = "nickname";
export const EMAIL: string = "email";
export const MAJOR: string = "major";
export const EXPECTED_GRADUATION_YEAR: string = "expected-graduation-year";
export const BIRTH_DATE: string = "birth-date";
export const GENDER_ID: string = "gender-id";
export const EDUCATION_ID: string = "education-id";

export const buildStudentRequest = async (formData: FormData): Promise<StudentRequest> => {
  const photo = await getFileFormData(formData, PHOTO);
  return {
    name: String(formData.get(NAME)),
    nickname: String(formData.get(NICKNAME)),
    email: String(formData.get(EMAIL)),
    major: String(formData.get(MAJOR)),
    expectedGraduationYear: String(formData.get(EXPECTED_GRADUATION_YEAR)),
    birthDate: String(formData.get(BIRTH_DATE)),
    genderId: Number(formData.get(GENDER_ID)),
    educationId: Number(formData.get(EDUCATION_ID)),
    photo: photo,
  };
};
